// middleware function to check for logged-in users
const loggedInRedirect = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = loggedInRedirect;