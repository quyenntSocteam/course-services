const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserModel = require('../../app/models/Acount');
const validation = require('../../app/middlewares/Authentication');

const accountController = require('../../app/controllers/account/AccountController');

router.post('/api/register',
  validation.validateUsername,
  validation.validateEmail,
  validation.validatePassword,
  validation.validatePasswordMatch,
  accountController.createAccount);
router.get('api/getallaccount', accountController.getAllAccounts);
router.post('/api/login', accountController.loginAccount);
router.get('/api/logout', accountController.logoutAccount);
router.post('/api/resetpassword', accountController.resetPasswordAccount);
router.get('/api/resetpassword/:userId/:resetToken', accountController.resetToken);
router.get('/api/verifytoken', accountController.verifyToken)
router.post('/api/resetpassword/:userId/:updateToken',
  validation.validatePassword,
  validation.validatePasswordMatch,
  accountController.updateToken);


module.exports = router;
