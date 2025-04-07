const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minLength: [3, 'Name must be at least 3 characters long'],
      maxLength: [20, 'Name must be at most 20 characters long'],
    },
    username: {
      type: String,
      unique: [true, 'Username is already taken'],
      required: [true, 'Username is required'],
      minLength: [3, 'Username must be at least 3 characters long'],
      maxLength: [20, 'Username must be at most 20 characters long'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [8, 'Password must be at least 8 characters long'],
      maxLength: [20, 'Password must be at most 20 characters long'],
    },
    confirmPassword: {
      type: 'String',
      required: [true, 'Confirm Password is a required field'],
      validate: {
        validator: function (confirmPassword) {
          return this.password === confirmPassword;
        },
        message: 'Password and Confirm password do not match',
      },
    },
    email: {
      type: String,
      unique: [true, 'Email is already taken'],
      required: [true, 'Email is required'],
      validate: {
        validator: function (email) {
          return validator.isEmail(email);
        },
        message: 'Please provide a valid email',
      },
      maxLength: [50, 'Email must be at most 50 characters long'],
    },
    profilePhoto: {
      url: {
        type: String,
        default:
          'https://res.cloudinary.com/dnnj53pqf/image/upload/v1742882638/ebtyc00ucwiurvnemsbm.jpg',
      },
      publicId: {
        type: String,
        default: 'ebtyc00ucwiurvnemsbm',
      },
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  user.id = user._id;
  delete user.password;
  delete user.__v;
  delete user._id;
  return user;
};

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.verifyPassword = async function (
  candidatePassword,
  hashedPassword
) {
  const result = await bcrypt.compare(candidatePassword, hashedPassword);
  return result;
};

userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
