const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");

const contactSchema = new mongoose.Schema({
  email: {
    unique: true,
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid!.");
      }
    },
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  mobileNumber: {
    unique: true,
    type: String,
    trim: true,
    required: true,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Phone number is invalid!.");
      }
    },
  },
  userId: {
    type: Number,
    required: true,
  },
  sharedUsers: [{
    userId: {
      type: Number
    }
  }]
});

contactSchema.plugin(uniqueValidator);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;