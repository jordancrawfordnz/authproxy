var PasswordHelper = require('./passwordhelper.js')

User.FIELDS = ['username', 'password', 'hashedPassword']
User.MISSING_REQUIRED_FIELD_MESSAGE = "A required field was not provided."

function User(userConfig) {
  var hasRequiredFields = true;

  User.FIELDS.forEach(function(field) {
    if (userConfig[field]) {
      this[field] = userConfig[field];
    }
  }.bind(this));

  if (!this.username) {
    hasRequiredFields = false;
  }

  if (!((this.hashedPassword && !this.password) || (!this.hashedPassword && this.password))) {
    hasRequiredFields = false;
  }

  if (!hasRequiredFields) {
    throw new Error(User.MISSING_REQUIRED_FIELD_MESSAGE);
  }
}

User.prototype.passwordNeedsHashing = function() {
  return !!this.password;
};

User.prototype.hashPassword = function() {
  if (this.passwordNeedsHashing()) {
    this.hashedPassword = PasswordHelper.getInstance().hashPassword(this.password);
    delete this.password;
  }
};

User.prototype.toJSON = function() {
  var json = {};
  User.FIELDS.forEach(function(field) {
    if (this[field]) {
      json[field] = this[field];
    }
  }.bind(this));
  return json;
};

module.exports = User;
