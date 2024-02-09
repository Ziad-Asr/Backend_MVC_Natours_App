const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please, tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please, provide your email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please, provide a valid email address'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please, provide a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please, confirm your password'],
    minlength: 8,
    validate: {
      // This onl works on ((create(user) => post & save)) not findOne or findOneAndUpdate for example.
      validator: function (el) {
        return el === this.password;
        // Must return true or false
      },
      message: 'Password are not the same',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Will noly run if the password is modified

  this.password = await bcrypt.hash(this.password, 12); // Used to hash(encrypt) the password
  this.passwordConfirm = undefined; // Delete the value of passwordConfirm => because it only used for verification not to be saved in the database

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
