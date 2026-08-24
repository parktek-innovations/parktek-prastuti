import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const exportRoot = path.resolve("out");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2"
};

async function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const relative = decoded.endsWith("/") ? `${decoded}index.html` : decoded;
  const candidate = path.resolve(exportRoot, `.${relative}`);

  if (!candidate.startsWith(`${exportRoot}${path.sep}`)) {
    return null;
  }

  try {
    const details = await stat(candidate);
    return details.isFile() ? candidate : null;
  } catch {
    return null;
  }
}

export function startStaticExportServer(port = 3100) {
  const server = createServer(async (request, response) => {
    const file = await resolveFile(request.url || "/");

    if (!file) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const body = await readFile(file);
    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type":
        contentTypes[path.extname(file).toLowerCase()] || "application/octet-stream"
    });
    response.end(request.method === "HEAD" ? undefined : body);
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}

export function stopStaticExportServer(server) {
  return new Promise((resolve, reject) => {
    server.closeAllConnections();
    server.close((error) => (error ? reject(error) : resolve()));
  });
}
