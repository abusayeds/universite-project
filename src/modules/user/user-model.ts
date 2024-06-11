import { Schema, model } from "mongoose";
import { TUserModel, Tuser } from "./user-interface";
import bcrypt from "bcrypt";
import config from "../../app/config";

const userSchema = new Schema<Tuser, TUserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0
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
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));

  next();
});

userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await UserModel.findOne({ id }).select('+password');
};
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
    return await bcrypt.compare(plainTextPassword,hashedPassword)
};

export const UserModel = model<Tuser, TUserModel>("User", userSchema);
