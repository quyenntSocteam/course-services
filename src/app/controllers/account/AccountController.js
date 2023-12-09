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
      if (!user) {
        errors.push('username')
        errors.push('password')
        res.json({
          message: 'Invalid username or password',
          success: false
        })
      } else {
        const isvalid = await user.comparePassword(req.body.password)
        if (!isvalid) {
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
      if (req.body.remember) {
        req.sessionOptions.maxAge = 24 * 60 * 60 * 1000 * 14;
        req.session.rememberme = req.sessionOptions.maxAge;
      } else {
        req.session.rememberme = null;
      }
    } catch (error) {
      res.json({
        message: error,
        success: false
      })
    }
  }
  // [GET] account/api/logout
  logoutAccount(req, res, next) {
    req.userId = null
    req.session.rememberme = null
    res.json({
      message: 'You are logged out now!',
      success: true,
    })
  }
  // [POST] account/api/resetpassword
  async resetPasswordAccount(req, res, next) {
    try {
      const validationError = validation.validationResult(req);
      const error = [];
      if (!validationErrors.isEmpty()) {
        validationErrors.errors.forEach((error) => {
          errors.push(error.param);
          res.json({
            message: error.msg,
            success: false,
          });
        });
      } else {
        const user = await AccountServices.findByEmail(req.body.email);
        if (user) {
          const resetToken = await AccountServices.createPasswordResetToken(
            user.id
          );
        }

        if (error.length) {
          res.json({
            data: req.body,
            errors,
          })
        }
        req.json({
          message:
            'If we found a matching user, you will receive a password reset link.',
          success: true
        });
      }
    } catch (error) {
      console.error(error)
    }
  }

  //[GET] account/api/resetpassword/:userId/:resetToken
  async resetToken (req, res, next) {
     try {
       const resetToken = await AccountServices.verifyPasswordResetToken(
        req.params.userId,
        req.params.resetToken
       )
       if(!resetToken) {
        req.json({
          message: 'The provided token is invalid!',
          success: false
        });
       }
     } catch (error) {
      return next(error);
     }
  }

  // [GET] account/api/verifytoken
  async verifyToken  (req, res, next) {
    try {
      const resetToken = await AccountServices.verifyPasswordResetToken(
        req.params.userId,
        req.params.resetToken
      );
      if (!resetToken) {
        req.json({
          message: 'The provided token is invalid!',
          success: false,
        });
      }
      return res.json({
        userId: req.params.userId,
        resetToken: req.params.resetToken,
      });
    } catch (err) {
      return next(err);
    }
  }

  // [POST] account/api/resetpassword/:userId/:updateToken
  async updateToken (req, res, next) {
    try {
      const resetToken = await AccountServices.verifyPasswordResetToken(
        req.params.userId,
        req.params.resetToken
      );
      if (!resetToken) {
        req.json({
          message: 'The provided token is invalid!',
          success: false
        });
      }
      const validationErrors = validation.validationResult(req);
      const errors = [];
      if (!validationErrors.isEmpty()) {
        validationErrors.errors.forEach((error) => {
          errors.push(error.param);
          req.json({
            message: error.msg,
            success: false,
          });
        });
      }

      if (errors.length) {
        // Render the page again and show the errors
        return res.json({
          message: req.body,
          userId: req.params.userId,
          resetToken: req.params.resetToken,
          errors,
        });
      }

      await AccountServices.changePassword(req.params.userId, req.body.password);
      await AccountServices.deletePasswordResetToken(req.params.resetToken);
      req.json({
        message: 'Your password was successfully changed!',
        success: true,
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new AccountController();