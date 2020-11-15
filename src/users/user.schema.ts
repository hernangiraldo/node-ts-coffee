import { Schema, model, Document } from "mongoose";
import { eRole } from "./enums/eRole.enum";
import { iUser } from "./interfaces/iUser.interface";

export const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: false,
    default: ''
  },
  role: {
    type: String,
    default: eRole.USER,
    enum: Object.values(eRole),

  },
  active: {
    type: Boolean,
    required: false,
    default: false
  },
  status: {
    type: Boolean,
    required: false,
    default: true
  },
  google: {
    type: Boolean,
    required: false,
    default: false
  }
})

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;

  return userObj;
}

export interface iUserDocument extends iUser, Document { }

export default model<iUserDocument>('User', UserSchema);