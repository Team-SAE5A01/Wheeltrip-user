const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

function start(route, handle) {
  function onRequest(req, res) {
    const parsedUrl = url.parse(req.url);
    let pathname = `.${parsedUrl.pathname}`;
    const ext = path.extname(pathname);

    // Gérer les fichiers statiques (CSS, images, scripts)
    if (pathname.startsWith("./public/") && fs.existsSync(pathname)) {
      const contentType = {
        ".css": "text/css",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".js": "application/javascript",
      }[ext] || "text/plain";

      fs.readFile(pathname, (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Erreur interne");
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(data);
        }
      });
      return;
    }

    // Routage normal
    route(handle, parsedUrl.pathname, res, req);
  }

  http.createServer(onRequest).listen(8080);
  console.log("🚀 Serveur lancé sur http://localhost:8080");
}

exports.start = start;
