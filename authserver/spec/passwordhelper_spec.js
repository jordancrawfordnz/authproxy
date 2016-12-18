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
      PasswordHelper.getInstance().hashPassword(this.user);
    });

    it("should remove the plaintext password", function() {
      expect(this.user.password).not.toBeDefined();
    });

    it("should set the hashedPassword", function() {
      expect(this.user.hashedPassword).toBeDefined();
    });
  });
});
