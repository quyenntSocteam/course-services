const Account = require('../../models/Acount');
const { mongooseToObject } = require('../../../until/mongoose');
const passport = require('passport');
const validation = require('../../middlewares/Authentication')
const AccountServices = require('../../../services/AccountServices')

class AccountController {
   // [POST] account/api/resgiter
    async createAccount(req, res, next) {
      try {
        const validationErrors = validation.validationResult(req);
        const errors = [];
        if (!validationErrors.isEmpty()) {
          validationErrors.errors.forEach((error) => {
            errors.push(error.param);
            res.json({
              message: error.msg,
              success: false,
            });
          });
        } else {
          const existingEmail = await AccountServices.findByEmail(req.body.email);
          const existingUsername = await AccountServices.findByUsername(
            req.body.username
          );

          if (existingEmail || existingUsername) {
            errors.push('email');
            errors.push('username');
            res.json({
              message: 'The given email address or the username exist already!',
              success: false,
            });
          }
        }

        if (errors.length) {
          return res.json({
            message: errors,
            success: false
          });
        }

        /**
         * @todo: Provide a method in UserService that will create a new user
         */
        await AccountServices.createUser(
          req.body.username,
          req.body.email,
          req.body.password
        );
        res.json({
          message: 'Your account was created!',
          success: true,
        });
      } catch (err) {
        return next(err);
      }
   }
   // [GET] account/api/getallaccount
   getAllAccounts(req, res, next) {
    Account.find({})
    .then((account) =>
        res.json({
            data: account,
            isSuccess: true,
        })
    )
    .catch((error) => {
        res.json({
            message: error,
            isSuccess: false,
        })
    });
   }
   // [POST] account/api/login
   async loginAccount(req, res, next) {
       try {
         const errors = []
         const user = await AccountServices.findByUsername(req.body.username)
         if(!user) {
           errors.push('username')
           errors.push('password')
           res.json({
             message: 'Invalid username or password',
             success: false
           })
         } else {
           const isvalid = await user.comparePassword(req.body.password)
           if(!isvalid) {
            errors.push('username')
            errors.push('password')
            res.json({
              message: 'Invalid username or password',
              success: false
            })
           }
         }
         res.userId = user.id
         res.json({
           message: "You are logged in now!",
           success: true
         })
       } catch (error) {
         console.error(error)
       }
   }
   // [GET] account/api/logout
   logoutAccount(req, res, next) {
    req.userId = null
    res.json({
      message: 'You are logged out now!',
      success: true,
    })
   }
}

module.exports = new AccountController();