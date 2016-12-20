var tmp = require("tmp");
var fs = require("fs-extra");
var jsonfile = require("jsonfile");

describe("Configuration", function() {
  var Configuration = require("../lib/configuration.js");
  var User = require("../lib/user.js");

  var NO_USERS_CONFIG_PATH = "spec/test_config/no_users.json";
  var VALID_CONFIG_PATH = "spec/test_config/valid_config.json";

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

    describe("the parameter", function() {
      ["users", "allowedOrigin", "port"].forEach(function(parameter) {
          describe(parameter, function() {
            it("should be present", function() {
              expect(this.config[parameter]).not.toBeNull();
              expect(this.config[parameter]).toBeDefined();
            });
          });
      });
    });
  });

  describe("save()", function() {
    beforeEach(function() {
      this.tmpFile = tmp.fileSync();

      fs.copySync(VALID_CONFIG_PATH, this.tmpFile.name);

      this.originalFileContents = jsonfile.readFileSync(this.tmpFile.name);
      this.originalUserCount = this.originalFileContents.users.length

      this.config = new Configuration(this.tmpFile.name);
      this.config.users.push(new User({
        username: "test user",
        password: "password"
      }));
      this.config.save();
      this.afterConstructFileContents = jsonfile.readFileSync(this.tmpFile.name);
    });

    it("changes to the users should be saved to the file", function() {
      expect(this.afterConstructFileContents.users.length).toEqual(this.originalUserCount + 1);
    });
  });

  describe("toJSON()", function() {
    beforeEach(function() {
      this.config = new Configuration(VALID_CONFIG_PATH);
      this.jsonFileContents = jsonfile.readFileSync(VALID_CONFIG_PATH);
    });

    it("should be the same as the JSON file", function() {
      expect(this.config.toJSON()).toEqual(this.jsonFileContents);
    });
  });
});
