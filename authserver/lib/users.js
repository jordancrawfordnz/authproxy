function Users(usersConfiguration) {
  this._users = {};
}

Users.prototype.add = function(user) {
  this._users.push(user);
};

Users.prototype.findByUsername = function(username) {
  return this._users[username];
};

Users.prototype.forEach = function(callback) {
  this._users.values().forEach(callback);
};

module.exports = Users;
