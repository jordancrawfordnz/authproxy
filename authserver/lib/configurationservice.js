var jsonfile = require('jsonfile');
var UserService = require('../lib/userservice.js')

ConfigurationService.MISSING_REQUIRED_FIELD_MESSAGE = 'Required field not provided.';

function ConfigurationService(configFilePath) {
  this.configFilePath = configFilePath;
  this._config = jsonfile.readFileSync(this.configFilePath);

  if (!this._hasRequiredFields()) {
    throw MISSING_REQUIRED_FIELD_MESSAGE;
  }

  this.users = new UserService(this._config.users);
  if (this.users.configNeedsSave) {
    this._save();
  }

  // TODO: Setup config fields for the optional variables.
}

ConfigurationService.prototype._save = function() {
  jsonfile.writeFileSync(this.configFilePath, this.config, {spaces: 2});
};

ConfigurationService.prototype._hasRequiredFields = function() {
  var requiredFieldsProvided = true;

  if (!this.config.users || Array.isArray(config.users)) {
  	requiredFieldsProvided = false;
  }

  return requiredFieldsProvided;
};
