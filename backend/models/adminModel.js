const mongoose = require('mongoose');
const { findOne } = require('./userModel');
const { Schema } = mongoose;


const adminSchema = new mongoose.Schema({
 email: {
    type: String, required: [true, "Email is required"],
    unique: true
  },
  password: { type: String,
  required:[true,"Password is required"] }
})

adminSchema.statics.login = async function (email, password) {
  console.log(email);
  const admin = await this.findOne({ email });
  if (admin) {
    const auth = await this.findOne({password})
    if (auth) {
      return admin;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const adminModel = mongoose.model("admins", adminSchema)
module.exports =adminModel;