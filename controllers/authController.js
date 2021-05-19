const bcrypt = require('bcrypt');

//--------------------------------------------- Page de connexion ------------------------------------------------------
// GET
exports.getLoginPage = (req, res) => {
  return res.render('login', { message: req.flash("message")})
}

// POST - Se connecter
exports.postLoginPage = async (req, res) => {
  
  const {email, password} = req.body;

  // Si l'email n'existe pas
  const findEmail = await querysql('SELECT COUNT(*) AS cnt FROM user WHERE email = ?', email)
  if (!findEmail[0].cnt > 0) {
      req.flash("message", "Aucun utilisateur avec cet email")
      return res.redirect('/auth/login')
  }

  // Si l'email existe
  // Vérifier le mot de passe
  const user = await querysql('SELECT userID, firstname, lastname, email, password FROM user WHERE email = ?', email)
  const passwordCheck = await bcrypt.compare(password, user[0].password)
  if(!passwordCheck) {
    req.flash("message", "Mot de passe incorret")
    return res.redirect('/auth/login')
  }
  else {
    req.session.userId = user[0].userID;
    req.session.user = {
      id : user[0].userID,
      firstname: user[0].firstname,
      lastname: user[0].lastname,
      email: user[0].email
    };
    console.log("session ", req.session.user);
    return res.redirect('/dashboard');
}
 
  
};





//--------------------------------------------- Page d'inscription ------------------------------------------------------
// GET
exports.getRegisterPage = (req, res) => {
  return res.render('register',  { message: req.flash("message")})
} 

// POST
exports.postRegisterPage = async (req, res) => {
  const { firstname, lastname, email, password } = req.body

  // Si l'email existe
  const findEmail = await querysql('SELECT COUNT(*) AS cnt FROM user WHERE email = ?', [email])
  if (findEmail[0].cnt > 0) {
    req.flash("message", "L'email existe déjà");
    return res.redirect('/auth/register')
  }


  // Ajoute un utilisateur
  try {

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)

    await querysql('INSERT INTO user (firstname, lastname, email, password) VALUES (?, ?, ?, ?)', [firstname, lastname, email, hash],
    (err, result) => {
      if(err) {
        req.flash("message", `Il y a une erreur ${err}`);
        return res.redirect('/auth/register')
      }
      req.flash("message", "Inscription avec succès ! Vous pouvez vous connecter.");
      return res.redirect('/auth/login')
    })
  } catch (err) {
    res.status(400).json({ message: err })
  }

} 


//--------------------------------------------- Lien pour se déconnecter ------------------------------------------------------

// GET - Se déconnecter
exports.getLogoutPage = async (req, res) => {
  req.session.destroy(function(err) {
    res.redirect("/auth/login");
 })
}