import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    lastName: { type: String, default: '' },
    name: { type: String, default: '' },
    email: { type: String, required: true, minLength: 1 },
    phone: { type: String, default:'' },
    address: { type: String, default:'' },
    postalCode: { type: Number, default:0 },
    product: { type: [Object], default: [] },
}, { timestamps: true });

const User = models.User || model("User", UserSchema);
export default User;