var bcrypt = require('bcryptjs');
const saltRounds = 10;

function PasswordService() { }

PasswordService.prototype.hashPassword = function(user) {
  var salt = bcrypt.genSaltSync(saltRounds);
  user.hashedPassword = bcrypt.hashSync(user.password, salt);
  delete user.password; // remove the plain text password.
};

PasswordService.getInstance = function() {
  if (!PasswordService._instance) {
    PasswordService._instance = new PasswordService();
  }
  return PasswordService._instance;
};

module.exports = PasswordService;
