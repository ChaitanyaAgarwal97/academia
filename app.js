const express = require("express");
const path = require("path");

//  App configuration
const app = express();
const PORT = process.env.PORT ?? 3000;

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const indexRoutes = require("./src/home/index.routes");
const userRoutes = require("./src/user/user.routes");

app.use(indexRoutes);
app.use("/user", userRoutes);

//  App listener
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});