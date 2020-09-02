// middleware function to check for logged-in users
const requireSession = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports = requireSession;