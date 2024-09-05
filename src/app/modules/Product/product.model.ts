import mongoose, { Schema } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new mongoose.Schema<TProduct>({
    name: {
      type: String,
      required: [true, 'Product name is required'],
      unique: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product category is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    stock: {
      type: Number,
      required: [true, 'Product stock is required'],
      min: [0, 'Stock cannot be negative'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    image: {
      type: String,
      // required: [true, 'Product image is required'],
      // unique: true,
    },
  }, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  });

// Create the model
export const Product = mongoose.model<TProduct>('Product', productSchema);