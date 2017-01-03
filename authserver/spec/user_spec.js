var User = require("../lib/user.js");

describe("User", function() {
  beforeEach(function() {
    this.username = "user1";
    this.password = "password";
    this.exampleHash = "hashhashhash";
  });

  describe("when constructed with", function() {
    var testCases = {
        "no password" : {
          username: this.username
        },
        "no username" : {
          password: this.password
        },
        "only hashed password" : {
          hashedPassword: this.exampleHash
        },
        "both password and hashedPassword" : {
          username: this.username,
          password: this.password,
          hashedPassword: this.exampleHash
        }
    }

    for(testCase in testCases) {
      describe(testCase, function() {
        it("should throw an exception when constructed", function() {
          expect(function() {
            new User(testCases[testCase]);
          }.bind(this)).toThrow(new Error(User.MISSING_REQUIRED_FIELD_MESSAGE));
        });
      });
    }
  });

  describe("with a plaintext password", function() {
    beforeEach(function() {
      this.user = new User({
        username: this.username,
        password: this.password
      });
    });

    describe("passwordNeedsHashing()", function() {
      it("should be true", function() {
        expect(this.user.passwordNeedsHashing()).toBe(true);
      });
    });

    describe("hashPassword()", function() {
      beforeEach(function() {
        this.user.hashPassword();
      });

      it("should have removed the plaintext password", function() {
        expect(this.user.password).not.toBeDefined();
      });

      it("should have a hashed password that is not equal to the plaintext password", function() {
        expect(this.user.hashedPassword).toBeDefined();
        expect(this.user.hashedPassword).not.toEqual(this.exampleHash);
      });
    });

    describe("toJSON()", function() {
      it("should contain the username and password fields", function() {
        expect(this.user.toJSON()).toEqual({
          username: this.username,
          password: this.password
        });
      });
    });
  });

  describe("with a hashed password", function() {
    beforeEach(function() {
      this.user = new User({
        username: this.username,
        hashedPassword: this.exampleHash
      });
    });

    describe("passwordNeedsHashing()", function() {
      it("should be false", function() {
        expect(this.user.passwordNeedsHashing()).toBe(false);
      });
    });

    describe("hashPassword()", function() {
      beforeEach(function() {
        this.user.hashPassword();
      });

      it("should not have changed the hashed password", function() {
        expect(this.user.hashedPassword).toEqual(this.exampleHash);
      });
    });

    describe("toJSON()", function() {
      it("should contain the username and hashedPassword fields", function() {
        expect(this.user.toJSON()).toEqual({
          username: this.username,
          hashedPassword: this.exampleHash
        });
      });
    });
  });
});
