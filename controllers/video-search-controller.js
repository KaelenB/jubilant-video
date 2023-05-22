const path = require("path");
const handleDb = require("../db/handle-db");
const multer = require("multer");

module.exports.initSearchPage = (req, res) => {
  const data = handleDb.getAllFiles();

  let listItems = "";
  for (const fileId in data) {
    listItems += `<li><a href="/video/${data[fileId].id}">${data[fileId].name}</a></li>`;
  }

  res.send(`<DOCTYPE !html>
    <html><head><title>Video Search</title></head>
    <body>
    <form action="/video/search" method="post">
    <label for="search">Search:</label>
    <input type="text" id="search" name="search">
    <input type="submit" value="Submit">
    </form>
    ${listItems ? `<ul>${listItems}</ul>` : "<div>No videos found</div>"}
    </body>
    </html>`);
};
