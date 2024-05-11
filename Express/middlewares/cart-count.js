async function checkCartCount(req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) {
    cart = [];
  }
  res.locals.cart = cart;
  next();
}

module.exports = { checkCartCount };
