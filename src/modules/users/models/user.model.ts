import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    },
    isVerified: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);

export const userModel = mongoose.model('User', UserSchema);
