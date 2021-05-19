// Vérifie si le visiteur est authentifié
exports.getVerifyAuth = (req, res, next) => {
  console.log("auth", req.session.user);
  if (req.session.user == undefined) {
    req.flash("message", "Vous devez être connecté.")
    return res.redirect('/auth/login')
  } else {
    next()
  }
}