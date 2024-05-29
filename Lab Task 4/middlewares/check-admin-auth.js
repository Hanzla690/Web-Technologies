const jwt = require("jsonwebtoken");
const secret = "secret";

function checkAdminAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/admin/login");
  }
  jwt.verify(token, secret, (err) => {
    if (err) {
      return res.redirect("/admin/login");
    }
  });
  next();
}

function checkLoginStatus(req, res, next) {
  if (!req.cookies.token) {
    next();
  }else{
    return res.redirect("/admin")
  }
}

module.exports = { checkAdminAuth, checkLoginStatus };
