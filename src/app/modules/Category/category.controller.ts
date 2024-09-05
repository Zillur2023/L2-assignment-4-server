import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryServices } from "./category.service";
import { ProductServices } from "../Product/product.service";

const createCategory = catchAsync(async (req, res) => {
    console.log('categoryController--req.file',req.file)
    const result = await CategoryServices.createCategoryIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category is create successfully',
        data: result
    })
})

const getSingleCategory = catchAsync(async (req, res) => {
    const {id} = req.params
    const result = await CategoryServices.getSingleCategoryFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category is retrieved successfully',
        data: result
    })
})

const getAllCategories = catchAsync(async (req, res) => {
    const result = await CategoryServices.getAllCategoriesFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Categories are retrieved successfully',
        data: result
    })
})

export const CategoryControllers = {
    createCategory,
    getSingleCategory,
    getAllCategories
}