require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const handlebars = require("express-handlebars");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelize = require("./config/connection");
const routes = require("./routes");
const logger = require("./middlewares/logger");
const helpers = require("./helpers");

const PORT = process.env.PORT || 3000;

const app = express();

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
  // session to expire after 10mins of inactivity
  cookie: { maxAge: 600000 },
};

const handlebarsOptions = { helpers };
const hbs = handlebars.create(handlebarsOptions);

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(cors());
app.use(session(sessionOptions));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../", "public")));
app.use(logger);
app.use(routes);

const init = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Failed to connect to DB");
  }
};

init();
