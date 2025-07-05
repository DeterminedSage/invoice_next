import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  template: {
    type: String,
    required: true,
    trim: true,
    default: "invoice_1",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bill_to: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
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
      trim: true,
    },
  },
  bill_from: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
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
      trim: true,
    },
  },
  invoice_number: {
    type: String,
    required: true,
    trim: true,
  },
  invoice_date: {
    type: Date,
    required: true,
  },
  descriptions: [
    {
      description: {
        type: String,
        required: true,
        trim: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
});

// const Invoice = mongoose.model("Invoice", invoiceSchema);

// export default Invoice;


let Invoice : mongoose.Model<any>;

try {
  Invoice = mongoose.model("Invoice");
}
catch (error) {
  Invoice = mongoose.model("Invoice", invoiceSchema);
}


export default Invoice;
