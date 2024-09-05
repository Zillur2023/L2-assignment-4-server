import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { Order } from "./order.model"
import { OrderServices } from "./order.service"


const createOrder = catchAsync(async (req, res) => {
    const result = await OrderServices.createOrderIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product is create successfully',
        data: result
    })
})
const orderbyTransactionId = catchAsync(async (req, res) => {
    const {transactionId} = req.params
    console.log({transactionId})
    const result = await OrderServices.orderbyTransactionIdFromDB(transactionId)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product is create successfully',
        data: result
    })
})



export const OrderControllers = {
    orderbyTransactionId,
    createOrder
}