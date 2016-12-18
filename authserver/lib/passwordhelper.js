var bcrypt = require('bcryptjs');
const saltRounds = 10;

function PasswordHelper() { }

PasswordHelper.prototype.hashPassword = function(user) {
  var salt = bcrypt.genSaltSync(saltRounds);
  user.hashedPassword = bcrypt.hashSync(user.password, salt);
  delete user.password; // remove the plain text password.
};

PasswordHelper.getInstance = function() {
  if (!PasswordHelper._instance) {
    PasswordHelper._instance = new PasswordHelper();
  }
  return PasswordHelper._instance;
};

module.exports = PasswordHelper;
