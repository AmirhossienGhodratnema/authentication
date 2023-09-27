import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    // lastName: { type: String, required: true, minLength: 1 },
    // email: { type: String, required: true, minLength: 1 },
    // phone: { type: String },
    // address: { type: String },
    // postalCode: { type: Number },
    // product: { type: [Object], default: [] },
}, { timestamps: true });

const User = models.User || model("User", UserSchema);
export default User;