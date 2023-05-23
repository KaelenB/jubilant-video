const express = require("express");
const exphbs = require('express-handlebars');
const app = express();
const multer = require("multer");
const includeMulter = multer().any();
require("./util/readenv").config();

app.set('view engine', 'hbs');
app.engine('hbs', exphbs.engine({
  extname: '.hbs',
  defaultLayout: 'home',
  layoutsDir: `${__dirname}/views/layouts`,
  partialsDir: `${__dirname}/views/partials`,
}));

const shouldParseRequest = (req) => {
  const currentMethod = req.method;
  const currentRoute = req.originalUrl;

  const restrictedRoutes = [
    {
      method: "POST",
      originalUrl: "/upload/",
    },
  ];

  for (var i = 0; i < restrictedRoutes.length; i++) {
    if (
      restrictedRoutes[i].method == currentMethod &&
      restrictedRoutes[i].originalUrl == currentRoute
    ) {
      return false;
    }
  }
  return true;
};
app.use((req, res, next) => {
  shouldParseRequest(req) ? includeMulter(req, res, next) : next();
});

app.use(express.static("public"));

const routes = require("./routes/");
app.use("/", routes);
app.listen(process.env.PORT, () => {
  console.log(`Server is listening at the port ${process.env.PORT}`);
});

module.exports.app = app;
