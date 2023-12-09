const crypto = require('crypto');

const Account = require('../app/models/Acount');
//const PasswordResetModel = require('../models/ResetTokenModel');
//const ResetTokenModel = require('../models/ResetTokenModel');

/**
 * Provides methods to fetch and manipulate users and password tokens
 */
class AccountServices {
  /**
   * Finds and returns a user by email address
   *
   * @param {*} email
   * @returns database result
   */
  static async findByEmail(email) {
    return Account.findOne({ email }).exec();
  }

  /**
   * Finds and returns a user by username
   *
   * @param {*} username
   * @returns database result
   */
  static async findByUsername(username) {
    return Account.findOne({ username }).exec();
  }

  /**
   * Creates a new user
   *
   * @param {*} username
   * @param {*} email
   * @param {*} password
   * @returns save result
   */
  static async createUser(username, email, password) {
    const user = new Account();
    user.email = email;
    user.password = password;
    user.username = username;
    const savedUser = await user.save();
    return savedUser;
  }

  static async createSocialUser(username, email, oauthProfile) {
    const user = new Account();
    user.email = email;
    user.oauthprofiles = [oauthProfile];
    user.password = crypto.randomBytes(10).toString('hex');
    user.username = username;
    const savedUser = await user.save();
    return savedUser;
  }

  /**
   * Creates a new password reset token
   *
   * @param {*} userId
   * @returns the created token
   */
  static async createPasswordResetToken(userId) {
    //const passwordReset = new PasswordResetModel();
    passwordReset.userId = userId;
    const savedToken = await passwordReset.save();
    return savedToken.token;
  }

  /**
   *
   * @param {*} userId
   * @param {*} token
   * @returns the token object if found
   */
  static async verifyPasswordResetToken(userId, token) {
    return PasswordResetModel.findOne({
      token,
      userId,
    }).exec();
  }

  /**
   * Deletes a password reset token
   * @param {*} token
   * @returns
   */
  static async deletePasswordResetToken(token) {
    // throw new Error('Not implemented');
    // return PasswordResetModel.findOneAndDelete({
    //   token,
    // }).exec();
  }

  /**
   * Changes a user's password
   * @param {*} userId
   * @param {*} password
   */
  static async changePassword(userId, password) {
    const user = await Account.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.password = password;
    return user.save();
  }

  // Helpers

  /**
   * Finds a user by id
   * @param {*} id
   * @returns a user
   */
  static async findById(id) {
    return Account.findById(id).exec();
  }

  static async findByOAuthProfile(provider, profileId) {
    return Account.findOne({
      oauthprofiles: { $elemMatch: { provider, profileId } },
    }).exec();
  }

  /**
   * returns the password reset token for a user
   * @param {*} id
   * @returns a user
   */
  static async getResetToken(userId) {
    //return ResetTokenModel.findOne({ userId }).exec();
  }

  /**
   * Get all users
   *
   * @returns a list of users
   */
  static async getList() {
    return Account.find().sort({ createdAt: -1 }).exec();
  }

  /**
   * Deletes a user
   *
   * @returns result
   */
  static async deleteUser(id) {
    return Account.findByIdAndDelete(id);
  }
}

module.exports = AccountServices;
