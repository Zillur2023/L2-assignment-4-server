import { NextFunction, Request, Response, Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { upload } from "../../utils/sendImageToCloudinary";
import { ProductControllers } from "./product.controller";

const router = Router();

router.get("/max-price", ProductControllers.getMaxPrice);
router.get("/", ProductControllers.getAllProudcts);
router.post("/create-product", ProductControllers.createProduct);
router.get(
  "/productByCategory/:category",

  ProductControllers.getProductByCategory
);
router.get("/:id", ProductControllers.getSingleProduct);
router.put("/update/:id", ProductControllers.updateProduct);
router.delete("/delete/:id", ProductControllers.deleteProduct);

export const ProductRoutes = router;
