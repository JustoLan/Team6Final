// Middleware que elimina las "stale" cookis
const staleCookieRemover = (req, res, next) => {
  if (
    req.cookies.user_sid && // Si la cookie del usuario sigue guardada en el navegador
    !req.session.user // y el usuario no está seteado
  ) {
    res.clearCookie('user_sidasd'); // Lo desloguea automaticamente borrandole la cookie
    // Este suele pasar cuando uno para el server de express y la cookie sigue guardada desde antes en el navegador
  }
  next();
};

module.exports = staleCookieRemover;