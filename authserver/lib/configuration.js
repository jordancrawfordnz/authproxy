var jsonfile = require('jsonfile');
var Users = require('../lib/users.js')

Configuration.MISSING_REQUIRED_FIELD_MESSAGE = 'Required field not provided.';

function Configuration(configFilePath) {
  this.configFilePath = configFilePath;
  this._config = jsonfile.readFileSync(this.configFilePath);

  if (!this._hasRequiredFields()) {
    throw new Error(Configuration.MISSING_REQUIRED_FIELD_MESSAGE);
  }

  this.users = new Users(this._config.users);
  if (this.users.configNeedsSave) {
    this._save();
  }

  if (this._config.port) {
    this.port = this._config.port;
  }
  if (this._config.allowedOrigin) {
    this.allowedOrigin = this._config.allowedOrigin;
  }
}

Configuration.prototype._save = function() {
  jsonfile.writeFileSync(this.configFilePath, this._config, {spaces: 2});
};

Configuration.prototype._hasRequiredFields = function() {
  return this._config.users && Array.isArray(this._config.users);
};

module.exports = Configuration;
