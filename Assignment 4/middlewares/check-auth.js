function checkAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/auth");
  } else {
    next();
  }
}

module.exports = { checkAuth };
