var bcrypt = require('bcryptjs');
const saltRounds = 10;

function PasswordHelper() { }

PasswordHelper.prototype.hashPassword = function(password) {
  var salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

PasswordHelper.getInstance = function() {
  if (!PasswordHelper._instance) {
    PasswordHelper._instance = new PasswordHelper();
  }
  return PasswordHelper._instance;
};

module.exports = PasswordHelper;
