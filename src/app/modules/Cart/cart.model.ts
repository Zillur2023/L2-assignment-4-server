import mongoose, { Schema } from "mongoose";
import { TCart, TCartProduct } from "./cart.interface";

const CartProductSchema: Schema<TCartProduct> = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
});

// Schema for UserCart
const CartSchema: Schema<TCart> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  products: [CartProductSchema], // Subdocument schema for cart items
});

// Models for CartItem and UserCart
export const CartProduct = mongoose.model<TCartProduct>(
  "CartProduct",
  CartProductSchema
);
export const Cart = mongoose.model<TCart>(
  "Cart",
  CartSchema
);
