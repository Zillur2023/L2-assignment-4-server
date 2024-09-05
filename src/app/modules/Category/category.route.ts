import { NextFunction, Request, Response, Router } from "express";
import { USER_ROLE } from "../User/user.constant";
import auth from "../../middlewares/auth";
import { CategoryControllers } from "./category.controller";
import { upload } from "../../utils/sendImageToCloudinary";


const router = Router()

router.post(
    "/create-category",
  
    CategoryControllers.createCategory
  );
router.get('/', CategoryControllers.getAllCategories)
router.get('/:id', CategoryControllers.getSingleCategory)


export const CartegoryRoutes = router