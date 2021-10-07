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

userSchema.methods.correctPass = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
