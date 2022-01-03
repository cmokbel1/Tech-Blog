const { redirect } = require("express/lib/response")

function isLoggedIn(req,res,next) {
  if (req.session.isLoggedIn) {
    next()
  } else {
    res.redirect('/login');
  }
}

module.exports = {
  isLoggedIn: isLoggedIn
}