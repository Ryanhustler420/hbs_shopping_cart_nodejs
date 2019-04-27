const express = require ('express');

const {getLogin} = require ('../controllers/auth');

const router = express.Router ();

router.get ('/login', getLogin);

module.exports = router;
