var jsonfile = require('jsonfile');
var UserService = require('../lib/userservice.js')

ConfigurationService.MISSING_REQUIRED_FIELD_MESSAGE = 'Required field not provided.';

function ConfigurationService(configFilePath) {
  this.configFilePath = configFilePath;
  this._config = jsonfile.readFileSync(this.configFilePath);

  if (!this._hasRequiredFields()) {
    throw new Error(ConfigurationService.MISSING_REQUIRED_FIELD_MESSAGE);
  }

  this.users = new UserService(this._config.users);
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

ConfigurationService.prototype._save = function() {
  jsonfile.writeFileSync(this.configFilePath, this._config, {spaces: 2});
};

ConfigurationService.prototype._hasRequiredFields = function() {
  return this._config.users && Array.isArray(this._config.users);
};

module.exports = ConfigurationService;
