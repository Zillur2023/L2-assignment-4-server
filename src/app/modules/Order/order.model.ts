import mongoose, { Schema } from "mongoose";
import { TOrder } from "./order.interface";


const OrderSchema = new mongoose.Schema<TOrder>(
    {
        user: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
        },
        products: [
            {
                _id: false,
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
            default: 'Pending',
        },
        paymentStatus: {
            type: String,
            enum: ['Pending', 'Paid', 'Failed'],
            default: 'Pending',
        },
        transactionId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Order = mongoose.model<TOrder>('Order', OrderSchema);