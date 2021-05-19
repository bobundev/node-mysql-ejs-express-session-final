const router = require('express').Router()
,      authController = require('../controllers/authController')

//--------------------------------------------- // Page de connexion ------------------------------------------------------
// GET
router.get('/login', authController.getLoginPage)
// POST

router.post("/login", authController.postLoginPage)



//--------------------------------------------- // Page d'inscription ------------------------------------------------------
// GET
router.get('/register', authController.getRegisterPage)

// POST
router.post('/register', authController.postRegisterPage)
module.exports = router;


//--------------------------------------------- // Lien pour se déconnecter ----------------------------------------------------
// GET
router.get("/logout", authController.getLogoutPage)
