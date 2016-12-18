var PasswordHelper = require('../lib/passwordhelper.js');

Users.NOT_ALL_USERS_VALID_MESSAGE = 'Not all users are valid. Please ensure there are no duplicates and every user has a username and password.'

function Users(usersConfiguration) {
  this._users = {};
  this.configNeedsSave = false;

  var allUsersValid = true;
  usersConfiguration.forEach(function(user) {
    if (this.passwordNeedsHashing(user)) {
      PasswordHelper.getInstance().hashPassword(user);
      this.configNeedsSave = true;
    }

    if (!this.isValid(user)) {
      allUsersValid = false;
    } else {
      this._users[user.username] = user;
    }
  }.bind(this));

  if (!allUsersValid) {
    throw new Error(Users.NOT_ALL_USERS_VALID_MESSAGE);
  }
}

Users.prototype.passwordNeedsHashing = function(user) {
  return user.password;
};

Users.prototype.isValid = function(user) {
  // A user is valid if they have a username, hashed password,
   // and no users with their username presently exist.
  return user.username && user.hashedPassword && !this._users[user.username];
};

module.exports = Users;
