User.FIELDS = ['username', 'password', 'hashedPassword']

function User(userConfig) {
  User.FIELDS.forEach(function(field) {
    if (userConfig[field]) {
      this[field] = userConfig[field];
    }
  }.bind(this));
}

User.prototype.passwordNeedsHashing = function() {
  return !!user.password;
};

User.prototype.isValid = function() {
  return this.username && ((this.hashedPassword && !this.password) || (!this.hashedPassword && this.password))
};

User.prototype.hashPassword = function() {
  if (this.passwordNeedsHashing()) {
    this.hashedPassword = Helper.getInstance().hashPassword(this.password);
    this.password = null;
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
