const mongoose = require('mongoose');
const validator = require('validator');

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your  name!']
    },
    username: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      minlength: 8,
      select: false
    },
    email: {
      type: String,
      required: [true, 'Please provide your email!'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    avatar: {
      type: String,
      require: false
    },
    role: {
      type: String,
      enum: {
        values: ['member', 'admin', 'host'],
        message: 'Role is either'
      },
      default: 'member'
    }

    // passwordChangedAt: Date,
    // passwordResetToken: String,
    // passwordResetExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// accountSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   this.password = await bcrypt.hash(this.password, 12);

//   this.passwordConfirm = undefined;
//   next();
// });

// accountSchema.pre('save', function (next) {
//   if (!this.isModified('password') || this.isNew) return next();

//   // - 1 giây để đảm bảo rằng token được tạo ra sau khi password được thay đổi
//   this.passwordChangedAt = Date.now() - 1000;
//   next();
// });

// accountSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// accountSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

//     return JWTTimestamp < changedTimestamp;
//   }

//   // False means NOT changed
//   return false;
// };

// accountSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString('hex');

//   this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex'); //digest là để mã hóa chuỗi

//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //10 phút

//   return resetToken;
// };
const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
