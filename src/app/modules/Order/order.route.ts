import { Router } from "express";
import { OrderControllers } from "./order.controller";

const router = Router()

router.post('/create', OrderControllers.createOrder)
router.post('/:transactionId', OrderControllers.orderbyTransactionId)

export const OrderRoutes = router