const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
});

// 🔐 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10); // generate salt
  this.password = await bcrypt.hash(this.password, salt); // hash + salt
  next();
});

// ✅ Compare input password with hashed password in DB
userSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
