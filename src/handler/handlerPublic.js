const fs = require("fs");
const path = require("path");

let contentType = {
  ".html": "text/html",
  ".css": "text/css",
  ".txt": "text/plain",
  ".jpg": "text/jpeg",
  ".js": "text/javascript",
  ".json": "application/json",
  ".ico": "text/plain",
};

const handlePublic = (url, response) => {
  const pathFile = path.join(__dirname, "..", "..", "public", url);
  const extension = path.extname(pathFile);

  fs.readFile(pathFile, "utf8", (err, file) => {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Server Error!");
    } else {
      response.writeHead(200, { "Content-Type": contentType[extension] });
      response.end(file);
    }
  });
};

const handlePublicHome = (url, response) => {
  const pathFile = path.join(__dirname, "..", "..", "src", url);
  const extension = path.extname(pathFile);
  console.log(extension);
  fs.readFile(pathFile, "utf8", (err, file) => {
    if (err) {
      response.writeHead(500, contentType["plain"]);
      response.end("Server Error!");
    } else {
      response.writeHead(200, contentType[extension]);
      response.end(file);
    }
  });
};
module.exports = {handlePublic,handlePublicHome};

