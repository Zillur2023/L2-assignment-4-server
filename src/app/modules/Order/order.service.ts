import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { initiatePayment } from "../payment/payment.utils";
import { Product } from "../Product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";


const createOrderIntoDB = async (OrderData:TOrder) => {
    const {user,products} = OrderData

    let totalPrice = 0;

    // Calculate the total price
    const productDetails = await Promise.all(
        products.map(async (item: any) => {
            const product = await Product.findById(item.product);
            if (product) {
                totalPrice += product.price * item.quantity;
                return {
                    product: product._id,
                    quantity: item.quantity
                };
            } else {
                throw new AppError(httpStatus.NOT_FOUND,'Product not found');
            }
        })
    );

    const transactionId = `TXN-${Date.now()}`;

    const order = new Order({
        user,
        products: productDetails,
        totalPrice,
        status: 'Pending',
        paymentStatus: 'Pending',
        transactionId
    });

    await order.save();

    const paymentData = {
        transactionId,
        totalPrice,
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone,
        customerAddress: user.address
    }

   const paymentSession = await initiatePayment(paymentData)
   console.log({paymentSession,paymentData})
    // console.log('ORDER --->', order)

    // return {paymentSession,paymentData};
    return {paymentSession,paymentData};
}

const orderbyTransactionIdFromDB = async(transactionId:string) => {
    console.log('transactionIdResult', transactionId)
    const result = await Order.findOne({transactionId})
    console.log('transactionIdResult', result)

    return result

}

export const OrderServices = {
    orderbyTransactionIdFromDB,
    createOrderIntoDB
}