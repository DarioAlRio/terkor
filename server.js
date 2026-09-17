// Servidor estático mínimo para previsualizar el sitio en local. Sin dependencias.
"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = Number(process.argv[2]) || process.env.PORT || 4173;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".png": "image/png",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    let filePath = path.join(ROOT, urlPath);
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }
    fs.stat(filePath, (statErr, stat) => {
      // URL limpia sin barra final ("/contacto") o con ella ("/contacto/"): ambas sirven
      // el index.html de esa carpeta, igual que hacen GitHub Pages, Netlify y Apache.
      if (!statErr && stat.isDirectory()) filePath = path.join(filePath, "index.html");
      fs.readFile(filePath, (err, data) => {
        if (err) {
          fs.readFile(path.join(ROOT, "404.html"), (err2, data2) => {
            res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
            res.end(err2 ? "404" : data2);
          });
          return;
        }
        const ext = path.extname(filePath);
        res.writeHead(200, { "Content-Type": TYPES[ext] || "application/octet-stream" });
        res.end(data);
      });
    });
  })
  .listen(PORT, () => console.log(`Terkor local: http://localhost:${PORT}`));
