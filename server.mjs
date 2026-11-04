import { createServer, request } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 4173);
const rfplanner = new URL(process.env.RFPLANNER_UPSTREAM || 'http://127.0.0.1:5180');
if (rfplanner.protocol !== 'http:' || !['127.0.0.1', 'localhost', '[::1]'].includes(rfplanner.hostname) || rfplanner.pathname !== '/' || rfplanner.username || rfplanner.password) {
  throw Error('RFPLANNER_UPSTREAM deve apontar para o servidor local do RFPlanner.');
}

function proxyPlanner(req, res) {
  const incoming = new URL(req.url, 'http://preview.local');
  const target = new URL(rfplanner);
  target.pathname = incoming.pathname;
  target.search = incoming.search;
  const upstream = request(target, {
    method: req.method,
    headers: {...req.headers, 'x-forwarded-host': req.headers.host, 'x-forwarded-proto': 'http'},
  }, response => {
    res.writeHead(response.statusCode || 502, response.headers);
    response.pipe(res);
  });
  upstream.setTimeout(120000, () => upstream.destroy());
  upstream.on('error', () => {
    if (!res.headersSent) res.writeHead(503, {'Content-Type':'text/plain; charset=utf-8'});
    res.end('O RFPlanner está temporariamente indisponível.');
  });
  req.on('aborted', () => upstream.destroy());
  req.pipe(upstream);
}

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

async function sendFile(res, filePath, statusCode = 200) {
  const body = await readFile(filePath);
  res.writeHead(statusCode, {
    "Content-Type": contentTypes[extname(filePath)] || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  res.end(body);
}

async function serveStatic(req, res) {
  const requestPath = new URL(req.url, `http://${req.headers.host}`).pathname;
  if (requestPath === '/rfplanner') {
    res.writeHead(308, {Location:'/rfplanner/'}); res.end(); return;
  }
  if (requestPath.startsWith('/rfplanner/')) { proxyPlanner(req, res); return; }
  // This server previews public files only. Never acknowledge an email request
  // with the SPA HTML: the contact form needs the production email backend.
  if (requestPath.startsWith('/api/') || !['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(404, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(JSON.stringify({ok: false, message: 'API unavailable in static preview'}));
    return;
  }
  const cleanPath = requestPath === "/" ? "/index.html" : requestPath;
  const filePath = normalize(join(root, cleanPath));
  const indexPath = join(root, "index.html");

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    await sendFile(res, filePath);
  } catch {
    if (extname(cleanPath)) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    try {
      await sendFile(res, indexPath);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  }
}

createServer(serveStatic).listen(port, () => {
  console.log(`IDA Telecom site em http://localhost:${port}`);
});
