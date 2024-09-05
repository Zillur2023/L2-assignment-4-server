import mongoose from "mongoose";
import { TCategory } from "./category.interface";


const categorySchema = new mongoose.Schema<TCategory>({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

// Create the model
export const Category = mongoose.model<TCategory>('Category', categorySchema);

