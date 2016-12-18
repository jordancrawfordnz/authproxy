var tmp = require("tmp");
var fs = require("fs-extra");
var jsonfile = require("jsonfile");

describe("ConfigurationService", function() {
  var ConfigurationService = require("../lib/configurationservice.js");
  var UserService = require("../lib/userservice.js");

  var NO_USERS_CONFIG_PATH = "spec/test_config/no_users.json";
  var VALID_CONFIG_PATH = "spec/test_config/valid_config.json";
  var VALID_RAW_CONFIG_PATH = "spec/test_config/valid_raw_config.json";

  describe("when given no users", function() {
    beforeEach(function() {
      this.configurationPath = NO_USERS_CONFIG_PATH;
    });

    it("should throw an exception for missing required fields", function() {
      expect(function() {
        new ConfigurationService(this.configurationPath)
      }.bind(this)).toThrow(new Error(ConfigurationService.MISSING_REQUIRED_FIELD_MESSAGE));
    });
  });

  describe("with a valid configuration", function() {
    beforeEach(function() {
      this.config = new ConfigurationService(VALID_CONFIG_PATH);
    });

    it("should have users", function() {
      expect(this.config.users).toEqual(jasmine.any(UserService))
    });

    describe("the optional parameter", function() {
      ["allowedOrigin", "port"].forEach(function(parameter) {
          describe(parameter, function() {
            it("should be present", function() {
              expect(this.config[parameter]).not.toBeNull();
              expect(this.config[parameter]).toBeDefined();
            });
          });
      });
    });
  });

  // TODO: This isn't ideal! UserService is an implementation detail of ConfigurationService so end up partially testing ConfigurationService here too.
  describe("when the users need updating", function() {
    beforeEach(function() {
      this.tmpFile = tmp.fileSync();
      fs.copySync(VALID_RAW_CONFIG_PATH, this.tmpFile.name);

      this.originalFileContents = jsonfile.readFileSync(this.tmpFile.name);
      expect(this.originalFileContents.users[0].password).toBeDefined();
      expect(this.originalFileContents.users[0].hashedPassword).not.toBeDefined();

      this.config = new ConfigurationService(this.tmpFile.name);
      expect(this.config.users.configNeedsSave).toBe(true);
      this.afterConstructFileContents = jsonfile.readFileSync(this.tmpFile.name);
    });

    it("changes to the users should be saved to the file", function() {
      expect(this.afterConstructFileContents.users[0].password).not.toBeDefined();
      expect(this.afterConstructFileContents.users[0].hashedPassword).toBeDefined();
    });
  });
});
