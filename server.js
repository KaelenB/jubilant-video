const express = require("express");
const app = express();
const multer = require("multer");
const includeMulter = multer().any();
require("./util/readenv").config();

const shouldParseRequest = (req) => {
  const currentMethod = req.method;
  const currentRoute = req.originalUrl;

  const restrictedRoutes = [
    {
      method: "POST",
      originalUrl: "/",
    },
  ];

  for (const i = 0; i < restrictedRoutes.length; i++) {
    if (
      restrictedRoutes[i].method == currentMethod &&
      restrictedRoutes[i].originalUrl == currentRoute
    ) {
      return false;
    }
  }
  return true;
};

app.use((req, res, next) =>
  shouldParseRequest(req) ? includeMulter(req, res, next) : next()
);

app.use(express.static("public"));

const routes = require("./routes/").default;
app.use("/", routes);
app.listen(process.env.PORT, () =>
  console.log("Server is listening on the port", process.env.PORT)
);

module.exports.app = app;
