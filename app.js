const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { auth } = require("./src/middlewares/auth.common");

//  App configuration
const app = express();
const PORT = process.env.PORT ?? 3000;

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(auth);

// Routes
const homeRoutes = require("./src/home/home.routes");
const userRoutes = require("./src/user/user.routes");
const indexRoutes = require("./src/index.routes");

app.use(homeRoutes);
app.use("/user", userRoutes);
app.use(indexRoutes);

//  App listener
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});