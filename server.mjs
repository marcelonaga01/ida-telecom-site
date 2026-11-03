import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 4173);

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
