function Users() {
  this._users = {};
}

Users.prototype.add = function(user) {
  this._users[user.username] = user;
};

Users.prototype.findByUsername = function(username) {
  return this._users[username];
};

Users.prototype.forEach = function(callback) {
  Object.values(this._users).forEach(function(user) {
    callback(user);
  });
};

module.exports = Users;
