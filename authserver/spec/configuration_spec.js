var tmp = require("tmp");
var fs = require("fs-extra");
var jsonfile = require("jsonfile");

describe("Configuration", function() {
  var Configuration = require("../lib/configuration.js");
  var Users = require("../lib/users.js");

  var NO_USERS_CONFIG_PATH = "spec/test_config/no_users.json";
  var VALID_CONFIG_PATH = "spec/test_config/valid_config.json";
  var VALID_RAW_CONFIG_PATH = "spec/test_config/valid_raw_config.json";

  describe("when given no users", function() {
    beforeEach(function() {
      this.configurationPath = NO_USERS_CONFIG_PATH;
    });

    it("should throw an exception for missing required fields", function() {
      expect(function() {
        new Configuration(this.configurationPath)
      }.bind(this)).toThrow(new Error(Configuration.MISSING_REQUIRED_FIELD_MESSAGE));
    });
  });

  describe("with a valid configuration", function() {
    beforeEach(function() {
      this.config = new Configuration(VALID_CONFIG_PATH);
    });

    it("should have users", function() {
      expect(this.config.users).toEqual(jasmine.any(Users))
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

  // TODO: This isn't ideal! Users is an implementation detail of Configuration so end up partially testing Configuration here too.
  describe("when the users need updating", function() {
    beforeEach(function() {
      this.tmpFile = tmp.fileSync();
      fs.copySync(VALID_RAW_CONFIG_PATH, this.tmpFile.name);

      this.originalFileContents = jsonfile.readFileSync(this.tmpFile.name);
      expect(this.originalFileContents.users[0].password).toBeDefined();
      expect(this.originalFileContents.users[0].hashedPassword).not.toBeDefined();

      this.config = new Configuration(this.tmpFile.name);
      expect(this.config.users.configNeedsSave).toBe(true);
      this.afterConstructFileContents = jsonfile.readFileSync(this.tmpFile.name);
    });

    it("changes to the users should be saved to the file", function() {
      expect(this.afterConstructFileContents.users[0].password).not.toBeDefined();
      expect(this.afterConstructFileContents.users[0].hashedPassword).toBeDefined();
    });
  });
});
