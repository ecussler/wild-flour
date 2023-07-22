const express = require("express");
const session = require("express-session");
const routes = require("./controllers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const path = require("path");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001; // for Heroku JAWSDB compatibility

const sess = {
  secret: "hash my password",
  cookie: { maxAge: 1200000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// sync form to the datasource
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
