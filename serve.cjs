const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const rfplanner = new URL(process.env.RFPLANNER_UPSTREAM || 'http://127.0.0.1:5180');
if (rfplanner.protocol !== 'http:' || !['127.0.0.1', 'localhost', '[::1]'].includes(rfplanner.hostname) || rfplanner.pathname !== '/' || rfplanner.username || rfplanner.password) throw Error('RFPLANNER_UPSTREAM deve apontar para o servidor local.');

function proxyPlanner(req, res, url) {
  const target = new URL(rfplanner); target.pathname = url.pathname; target.search = url.search;
  const upstream = http.request(target, {method:req.method, headers:{...req.headers}}, response=>{
    res.writeHead(response.statusCode || 502, response.headers); response.pipe(res);
  });
  upstream.setTimeout(120000, ()=>upstream.destroy());
  upstream.on('error', ()=>{if(!res.headersSent)res.writeHead(503,{'Content-Type':'text/plain; charset=utf-8'});res.end('RFPlanner temporariamente indisponível.');});
  req.on('aborted', ()=>upstream.destroy()); req.pipe(upstream);
}

function loadLocalEnv() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();
    if (!key || process.env[key] !== undefined) continue;

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

loadLocalEnv();

const port = Number(process.env.PORT || 4177);
const maxBodyBytes = 8192;
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMax = 5;
const rateLimit = new Map();

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
};

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(data));
}

function sanitize(value, maxLength) {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    let body = "";
    let tooLarge = false;

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > maxBodyBytes && !tooLarge) {
        tooLarge = true;
        reject(Object.assign(new Error("Payload too large"), { status: 413 }));
        return;
      }
      if (tooLarge) return;
      body += chunk;
    });

    req.on("end", () => {
      if (tooLarge) return;
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(Object.assign(new Error("Invalid JSON"), { status: 400 }));
      }
    });

    req.on("error", reject);
  });
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) return forwarded.split(",")[0].trim();
  return req.socket.remoteAddress || "unknown";
}

function checkRateLimit(ip) {
  const now = Date.now();
  const current = rateLimit.get(ip) || { count: 0, resetAt: now + rateLimitWindowMs };

  if (current.resetAt <= now) {
    current.count = 0;
    current.resetAt = now + rateLimitWindowMs;
  }

  current.count += 1;
  rateLimit.set(ip, current);
  return current.count <= rateLimitMax;
}

function normalizeContact(payload) {
  const contact = {
    name: sanitize(payload.name, 120),
    email: sanitize(payload.email, 254).toLowerCase(),
    company: sanitize(payload.company, 160),
    message: sanitize(payload.message, 2000),
    website: sanitize(payload.website, 200),
    pageUrl: sanitize(payload.pageUrl, 500),
  };

  const errors = [];
  if (!contact.name) errors.push("name");
  if (!contact.company) errors.push("company");
  if (!isValidEmail(contact.email)) errors.push("email");
  if (!contact.message || contact.message.length < 10) errors.push("message");
  if (contact.website) errors.push("spam");

  return { contact, errors };
}

function buildEmail(contact) {
  const subjectName = contact.company || contact.name;
  const subject = `Novo contato pelo site IDA Telecom — ${subjectName}`;
  const receivedAt = new Date().toISOString();
  const text = [
    "Novo contato recebido pelo site IDA Telecom",
    "",
    `Nome: ${contact.name}`,
    `Empresa: ${contact.company || "Não informado"}`,
    `E-mail: ${contact.email}`,
    `Mensagem: ${contact.message}`,
    "",
    `Origem: ${contact.pageUrl || "Não informado"}`,
    `Data/hora do recebimento: ${receivedAt}`,
  ].join("\n");

  const html = `
    <p><strong>Novo contato recebido pelo site IDA Telecom</strong></p>
    <p><strong>Nome:</strong> ${escapeHtml(contact.name)}</p>
    <p><strong>Empresa:</strong> ${escapeHtml(contact.company || "Não informado")}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(contact.email)}</p>
    <p><strong>Mensagem:</strong><br>${escapeHtml(contact.message).replace(/\n/g, "<br>")}</p>
    <p><strong>Origem:</strong> ${escapeHtml(contact.pageUrl || "Não informado")}</p>
    <p><strong>Data/hora do recebimento:</strong> ${escapeHtml(receivedAt)}</p>
  `;

  return { subject, text, html };
}

async function sendContactEmail(contact) {
  if (process.env.CONTACT_DRY_RUN === "true") return;
  if (process.env.CONTACT_SIMULATE_EMAIL_FAILURE === "true") {
    throw new Error("Simulated email failure");
  }

  const to = process.env.CONTACT_TO_EMAIL || "marcelo.nagashima@idatele.com";
  const from = process.env.CONTACT_FROM_EMAIL || process.env.RF_EMAIL_FROM;
  const apiKey = process.env.EMAIL_API_KEY || process.env.RESEND_API_KEY;
  const apiUrl = process.env.EMAIL_API_URL || "https://api.resend.com/emails";

  if (!to || !from || !apiKey) {
    throw new Error("Missing email configuration");
  }

  const email = buildEmail(contact);
  const response = await fetch(apiUrl, {
    method: "POST",
    redirect: "manual",
    signal: AbortSignal.timeout(20000),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: email.subject,
      text: email.text,
      html: email.html,
      reply_to: contact.email,
    }),
  });

  if (!response.ok) {
    await response.body?.cancel();
    throw new Error("Email provider rejected the request");
  }
  const receipt = await response.json();
  if (typeof receipt.id !== 'string' || !receipt.id) throw new Error("Email provider did not confirm sending");
}

async function handleContact(req, res) {
  if (req.method !== "POST") {
    res.writeHead(405, { Allow: "POST" });
    res.end("Method not allowed");
    return;
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    sendJson(res, 429, { ok: false, message: "Too many requests" });
    return;
  }

  let payload;
  try {
    payload = await readJsonBody(req);
  } catch (error) {
    sendJson(res, error.status || 400, { ok: false, message: "Invalid request" });
    return;
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    sendJson(res, 400, { ok: false, message: "Invalid request" });
    return;
  }

  const { contact, errors } = normalizeContact(payload);
  if (errors.includes("spam")) {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (errors.length) {
    sendJson(res, 422, { ok: false, fields: errors });
    return;
  }

  try {
    await sendContactEmail(contact);
    sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error("Contact email failed");
    sendJson(res, 502, { ok: false, message: "Could not send message" });
  }
}

function handleStatic(req, res, url) {
  let decoded;
  try { decoded = decodeURIComponent(url.pathname); } catch {res.writeHead(400);res.end('Invalid path');return;}
  let filePath = path.join(root, decoded);

  if (!filePath.startsWith(root + path.sep) && filePath !== root) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  // Only serve the institutional public files; runtime, sources, credentials
  // and SQLite must never be exposed from this combined repository.
  const relative = path.relative(root, filePath).split(path.sep).join('/');
  const publicFile = ['index.html','app.js','styles.css'].includes(relative) ||
    (relative.startsWith('assets/') && ['.svg','.jpeg','.jpg','.png','.webp','.ico','.avif'].includes(path.extname(relative)));
  const spaRoute = !path.extname(relative) && !decoded.split('/').some(part=>part.startsWith('.')) && !/^(rf-engine|rfplanner|docs|deploy|node_modules)(\/|$)/.test(relative);
  if (!publicFile && !spaRoute) {res.writeHead(404);res.end('Not found');return;}

  if (url.pathname === "/" || !path.extname(filePath)) {
    filePath = path.join(root, "index.html");
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, { "Content-Type": types[path.extname(filePath)] || "application/octet-stream" });
    res.end(data);
  });
}

http
  .createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${port}`);

    if(url.pathname === '/rfplanner'){res.writeHead(308,{Location:'/rfplanner/'});res.end();return;}
    if(url.pathname.startsWith('/rfplanner/')){proxyPlanner(req,res,url);return;}

    if (url.pathname === "/api/contact") {
      handleContact(req, res);
      return;
    }

    handleStatic(req, res, url);
  })
  .listen(port, () => {
    console.log(`IDA preview running at http://localhost:${port}`);
  });
