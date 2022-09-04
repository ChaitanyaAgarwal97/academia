const express = require("express");
const path = require("path");

//  App configuration
const app = express();
const PORT = process.env.PORT ?? 3000;

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, './public')));

// Routes
const indexRoutes = require("./router/indexRoutes");

app.use(indexRoutes);

//  App listener
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});