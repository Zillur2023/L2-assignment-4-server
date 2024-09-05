import { join } from "path";
import { Order } from "../Order/order.model";
import { verifyPayment } from "./payment.utils";
import { readFileSync } from "fs";

const createPaymentIntoDB = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  // console.log({ verifyResponse });

  let result;
  let message;

  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    result = await Order.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: "Paid",
      }
    );
    message = "Successfully Paid!"
  } else {
    message = "Payment Failed!"
  }

  // const filePath = join(__dirname, './views/confirmation.html')
  const filePath = join(__dirname, '../../../public/confirmation.html')
  let template = readFileSync(filePath,'utf-8')

  template = template.replace(' {{message}} ', message)

  // return result;
  return template;
};

export const paymentServices = {
  createPaymentIntoDB,
};
