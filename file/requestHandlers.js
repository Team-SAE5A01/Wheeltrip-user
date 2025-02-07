const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

// Fonction pour servir un fichier HTML avec variables dynamiques
function serveHtml(filePath, res, variables = {}) {
  const fullPath = path.join(__dirname, "views", filePath);

  fs.readFile(fullPath, "utf8", (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("404 Not Found");
      return;
    }

    // Remplacement des variables {title}, {message}
    Object.keys(variables).forEach((key) => {
      data = data.replace(new RegExp(`{${key}}`, "g"), variables[key]);
    });

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(data);
  });
}

// Page d'accueil
function start(res) {
  console.log("Le gestionnaire 'start' est appelé.");
  serveHtml("index.html", res, { title: "Bienvenue", message: "Ceci est la page d'accueil." });
}

// Page de formulaire de téléversement
function upload(res, req) {
  console.log("Le gestionnaire 'upload' est appelé.");

  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Erreur lors du téléversement.");
      return;
    }

    const oldPath = files.upload.filepath; // Utilisation de `.filepath` au lieu de `.path`
    const newPath = path.join(__dirname, "uploads", "test.png");

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Erreur lors du déplacement du fichier.");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("Image reçue :<br/>");
      res.write("<img src='/show' />");
      res.end();
    });
  });
}

// Affichage de l'image téléchargée
function show(res) {
  console.log("Le gestionnaire 'show' est appelé.");
  const filePath = path.join(__dirname, "uploads", "test.png");

  fs.readFile(filePath, (err, file) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Image non trouvée.");
      return;
    }

    res.writeHead(200, { "Content-Type": "image/png" });
    res.end(file);
  });
}

// Exemple de page dynamique
function example(res) {
  serveHtml("contact.html", res, { title: "Contact", message: "Contactez-nous ici." });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.example = example;
