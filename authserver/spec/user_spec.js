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
        "both password and hashedPassword" : {
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

// describe("with no password or hashed password", function() {
//    it("throws an exception upon construction")
//        expect(function() {
//          new User({
//            username: this.username
//          });
//        }.bind(this)).toThrow(new Error(Configuration.MISSING_REQUIRED_FIELD_MESSAGE));
//      });
//    });
//
//    describe("with both a password and hashed password", function() {
//
//    });
//
//    describe("with a plaintext password", function() {
//      describe("hashPassword()", function() {
//
//      });
//
//      describe("passwordNeedsHashing()", function() {
//
//      });
//
//      describe("toJSON()", function() {
//
//      });
//    });
//
//    describe("with no ")
//
//    describe("passwordNeedsHashing", function() {
//
//    });
//
//    describe("isValid", function() {
//
//    });
});
