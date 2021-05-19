const router = require('express').Router()
const dashboardController = require('../controllers/dashboardController')

//--------------------------------------------- // Tableau de bord ------------------------------------------------------
// GET
router.get('/', dashboardController.getDashboardPage)

module.exports = router;