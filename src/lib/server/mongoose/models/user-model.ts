import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  verification_otp: {
    type: Number,
    required: false,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  tokens: [
    {
      token: {
        type: String,
        required: false,
      },
    },
  ],
});

let User: mongoose.Model<any>;

try {
  User = mongoose.model("User");
} catch (error) {
  User = mongoose.model("User", userSchema);
}

export default User;
