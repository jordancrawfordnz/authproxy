var Users = require("../lib/users.js");
var User = require("../lib/user.js");

describe("Users", function() {
  beforeEach(function() {
    this.user1Username = "user1";
    this.user1Password = "password";

    this.user1 = new User({
      username: this.user1Username,
      password: this.user1Password
    });

    this.users = new Users();
  });

  describe("add(user)", function() {
    beforeEach(function() {
      this.users.add(this.user1);
    });

    it("allows the user to be found afterwards", function() {
      expect(this.users.findByUsername(this.user1Username)).toBeDefined();
    });
  });

  describe("findByUsername(username)", function() {
    describe("on a missing user", function() {
      it("should be undefined", function() {
        expect(this.users.findByUsername("missingusername")).not.toBeDefined();
      });
    });

    describe("on a valid user", function() {
      beforeEach(function() {
        this.users.add(this.user1);
      });

      it("should return the user", function() {
        expect(this.users.findByUsername(this.user1.username)).toEqual(this.user1);
      });
    });
  });

  describe("forEach(callback)", function() {
    beforeEach(function() {
      this.users.add(this.user1);
    });

    it("should be called as many times as there are users", function() {
      callbackSpy = jasmine.createSpy('callbackSpy');
      this.users.forEach(callbackSpy);
      expect(callbackSpy).toHaveBeenCalledWith(this.user1);
    });
  });
});
