const jwt = require("../utils/jwt");
const User = require("../user/user.model");

async function auth(req, res, next) {
  try {
    const token = req.cookies.ljwt;

    if (!token) {
      throw "";
    }

    let user = jwt.tokenVerify(token);

    user = await User.findOne({ email: user.email });

    if (user) {
      req.isAuth = true;
      req.user = user;
      return next();
    }

    throw "";
  } catch (err) {
    req.isAuth = false;
    res.redirect("/");
  }

  next();
}

module.exports = {
  auth,
};
