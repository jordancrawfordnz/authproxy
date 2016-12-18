var PasswordService = require("../lib/passwordservice.js");

describe("PasswordService", function() {
  beforeEach(function() {
      this.user = {
        "username" : "user1",
        "password" : "mypassword"
      };
  });

  describe("hashPassword", function() {
    beforeEach(function() {
      PasswordService.getInstance().hashPassword(this.user);
    });

    it("should remove the plaintext password", function() {
      expect(this.user.password).not.toBeDefined();
    });

    it("should set the hashedPassword", function() {
      expect(this.user.hashedPassword).toBeDefined();
    });
  });
});
