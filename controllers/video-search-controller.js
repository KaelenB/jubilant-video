const path = require("path");
const handleDb = require("../db/handle-db");
const multer = require("multer");

module.exports.initSearchPage = (req, res) => {
  const data = handleDb.getAllFiles();

  let listItems = []
  for (const fileId in data) {
    listItems.push(data[fileId]);
  }

  res.render("search", { showListItems: (listItems.length > 0), listItems: listItems });
};
