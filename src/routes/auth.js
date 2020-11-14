import express from 'express';
const router = express.Router();

const authController = require('../controllers/auth');

router.route('/')
    .get(authController.getAuth);

router.route('/login')
    .post(authController.postLogIn);

router.route('/logout')
    .post(authController.postLogOut);

module.exports = router;