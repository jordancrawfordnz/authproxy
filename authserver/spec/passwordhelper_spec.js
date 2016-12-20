var PasswordHelper = require("../lib/passwordhelper.js");

describe("PasswordHelper", function() {
  beforeEach(function() {
      this.user = {
        "username" : "user1",
        "password" : "mypassword"
      };
  });

  describe("hashPassword", function() {
    beforeEach(function() {
      this.plainTextPassword = "mypassword";
      this.hashedResult = PasswordHelper.getInstance().hashPassword(this.plainTextPassword);
    });

    it("should not be null or undefined", function() {
      expect(this.hashedResult).toBeDefined();
      expect(this.hashedResult).not.toBeNull();
    });

    it("should not equal the plaintext password", function() {
      expect(this.hashedResult).not.toEqual(this.plainTextPassword);
    });
  });
});
