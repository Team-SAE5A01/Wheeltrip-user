function route(handle, pathname, res, req) {
  console.log("Routage de la requête pour " + pathname);

  if (typeof handle[pathname] === "function") {
    handle[pathname](res, req);
  } else {
    console.log("Aucun gestionnaire trouvé pour " + pathname);
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("404 Page non trouvée");
  }
}

exports.route = route;
