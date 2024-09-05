import mongoose from "mongoose";


export type TOrder = {
    user: {
      name: string;
      email: string;
      phone: string;
      address: string;
    };
    products: {
      product: mongoose.Schema.Types.ObjectId;
      quantity: number;
    }[];
    totalPrice: number;
    status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
    paymentStatus: 'Pending' | 'Paid' | 'Failed';
    transactionId: string;
  };
