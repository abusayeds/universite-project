import { Schema, model } from "mongoose";
import { Tuser } from "./user-interface";
import bcrypt from "bcrypt";
import config from "../../app/config";

const userSchema = new Schema<Tuser>(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isdeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// password hasing
userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt));

  next();
});

userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});
// password hasing

export const UserModel = model("User", userSchema);
