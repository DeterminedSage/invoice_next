import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  addressLine1: {
    type: String,
    required: true,
    trim: true,
  },
  addressLine2: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

let Organization: mongoose.Model<any>;

try {
  Organization = mongoose.model("Organization");
} catch (error) {
  Organization = mongoose.model("Organization", organizationSchema);
}

export default Organization;
