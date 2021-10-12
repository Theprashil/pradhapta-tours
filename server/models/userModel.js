const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name'],
    },
    email: {
      type: String,
      required: [true, 'A user must have a email address'],
      unique: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'tour-guide'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'A user must have a password'],
      min: 9,
      select: false,
    },
    confirmPass: {
      type: String,
      required: [true, 'Reconfirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Confirm password is not same',
      },
    },
    passwordUpdated: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPass = undefined;
  }
  next();
});

//Fn to compare the hashed pass and user inputed pass
userSchema.methods.correctPass = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

// Fn to check if the password is updated
userSchema.methods.changedPass = function (JWTTimestamp) {
  if (this.passwordUpdated) {
    const newPassChangedTime = parseInt(
      this.passwordUpdated.getTime() / 1000,
      10
    );
    return JWTTimestamp < newPassChangedTime;
  }
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
