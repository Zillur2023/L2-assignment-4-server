import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import exp from "constants";
import { paymentServices } from "./payment.service";

const createPayment = catchAsync(async (req, res) => {
  const { transactionId, status } = req.query;
  const result = await paymentServices.createPaymentIntoDB(
    transactionId as string, status as string
  );
  res.send(result);


  // sendResponse(res, {
  //     statusCode: httpStatus.OK,
  //     success: true,
  //     message: 'Product is create successfully',
  //     data: result
  // })
});

export const paymentControllers = {
  createPayment,
};
