const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { auth } = require("./src/middlewares/auth.common");
const compression = require("compression");

//  App configuration
const app = express();
const PORT = process.env.PORT ?? 3000;

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet(
    {
        contentSecurityPolicy: {
            directives: {
                "script-src": ["'self'", "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/"],
                "img-src": ["'self' data:", "https://www.gstatic.com/classroom/"],
                "style-src": ["'self' https: 'unsafe-inline'", "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/"],
            }
        }
    }
));
app.use(compression());
app.use(auth);

// Routes
const homeRoutes = require("./src/home/home.routes");
const userRoutes = require("./src/user/user.routes");
const indexRoutes = require("./src/index.routes");
const classRoutes = require("./src/class/class.routes");

app.use(homeRoutes);
app.use("/user", userRoutes);
app.use(indexRoutes);
app.use("/class", classRoutes);

//  App listener
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
