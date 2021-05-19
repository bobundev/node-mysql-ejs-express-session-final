exports.getDashboardPage = (req, res) => {
  // console.log("req.session :", req.session.user)
  const user = req.session.user
  return res.render('dashboard',{user} )
}