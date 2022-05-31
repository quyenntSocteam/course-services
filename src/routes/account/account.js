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


module.exports = router;
