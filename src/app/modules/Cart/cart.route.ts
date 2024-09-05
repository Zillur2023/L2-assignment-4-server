import { Router } from "express";
// import { CartController } from "./cart.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

// router.post("/", auth(USER_ROLE.user), CartController.addToCart);

// export const CartRoutes = router;
