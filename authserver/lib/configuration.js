var jsonfile = require('jsonfile');
var Users = require('users.js')

Configuration.MISSING_REQUIRED_FIELD_MESSAGE = 'Required field not provided.';
Configuration.FIELDS = ['users', 'port', 'allowedOrigin'];

function Configuration(configFilePath) {
  this.configFilePath = configFilePath;

  var rawConfig = jsonfile.readFileSync(this.configFilePath);
  if (!this._hasRequiredFields(rawConfig)) {
    throw new Error(Configuration.MISSING_REQUIRED_FIELD_MESSAGE);
  }

  Configuration.FIELDS.forEach(function(field) {
    if (rawConfig[field]) {
      this[field] = rawConfig[field];
    }
  }.bind(this));
}

Configuration.prototype._hasRequiredFields = function(rawConfig) {
  return rawConfig.users && Array.isArray(rawConfig.users);
};

Configuration.prototype.save = function() {
  jsonfile.writeFileSync(this.configFilePath, this.toJSON(), {spaces: 2});
};

Configuration.prototype.toJSON = function() {
  var json = {};
  Configuration.FIELDS.forEach(function(field) {
    if (this[field]) {
      json[field] = this[field];
    }
  }.bind(this));
  return json;
};

module.exports = Configuration;
