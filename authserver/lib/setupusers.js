var User = require('users.js')

SetupUsers.NOT_ALL_USERS_VALID_MESSAGE = 'Not all users are valid. Please ensure there are no duplicates and every user has a username and password.'

function SetupUsers(configuration, users) {
  this.configuration = configuration;
  this.users = users;
}

SetupUsers.prototype.call = function() {
  var allUsersValid = true;
  var configNeedsSave = false;
  this.configuration.users.forEach(function(userDetails) {
    if (!user.isValid() || this.users.findByUsername(userDetails.username)) {
      allUsersValid = false;
      return;
    }

    var user = new User(user);
    if (user.passwordNeedsHashing()) {
      user.hashPassword();
      configNeedsSave = true;
    }

    this.users.add(user);
  }.bind(this));

  if (!allUsersValid) {
    throw new Error(SetupUsers.NOT_ALL_USERS_VALID_MESSAGE);
  }
  
  if (configNeedsSave) {
    this.configuration.users = [];
    this.users.forEach(function(user) {
      this.configuration.users.push(user.toJSON());
    }.bind(this));
    this.configuration.save();
  }
};

module.exports = SetupUsers;
