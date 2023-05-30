const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const { User } = require("./user.model");

describe("User.generateAuthToken", () => {
  it("should return valid jwt with user info in payload", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      name: "James Belford",
      role: "patient",
      email: "test@email.com",
      password: "something",
    };
    const user = new User(payload);

    const token = user.generateAuthToken();

    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    expect(decoded).toMatchObject({
      _id: payload._id,
      name: payload.name,
      role: payload.role,
      email: payload.email
    });
  });
});
