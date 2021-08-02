const express = require("express");
const path = require("path");
const session = require("express-session");
const handlebars = require("express-handlebars");
// const routes = require("./controllers");
const SequelizeStore = require("connect-session-sequelize")(session.store);
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 3001;
const app = express();

const session1 = {
    secret: "Ultra super secret",
    cookie: {},
    uninitSave: true,
    save: false,
    store: new SequelizeStore({
        db: sequelize,
    })
};

app.use(session(session1));

const hbs = exphbs.create({helpers});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening at port ${PORT}.`));
});


