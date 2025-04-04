const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model('user', userSchema);
