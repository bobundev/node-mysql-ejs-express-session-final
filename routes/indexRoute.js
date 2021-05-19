const router = require('express').Router();
const indexController = require('../controllers/indexController')

// GET - Index Page
router.get("/", indexController.getIndexPage)

module.exports = router;