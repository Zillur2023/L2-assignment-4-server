import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";


const createProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.createProductIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product is create successfully',
        data: result
    })
})

const getSingleProduct = catchAsync(async (req, res) => {
    const {id} = req.params
    //  const updatedData = req.body
    const result = await ProductServices.getSingleProductFromDB(id,req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product is retrieved successfully',
        data: result
    })
})
const updateProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.updateProductIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product is updated successfully',
      data: result,
    });
  });
  
  const deleteProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.deleteProductFromDB(req.params.id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product has been deleted successfully',
      data: result,
    });
  });

const getAllProudcts = catchAsync(async (req, res) => {
    const result = await ProductServices.getAllProudctsFromDB(req.query)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Products are retrieved successfully',
        meta: result.meta,
        data: result.result,
    })
})

const getProductByCategory = catchAsync(async (req, res) => {
   
    const result = await ProductServices.getProductByCategoryFromDB({
        category: req.params.category, // Ensure this matches your route parameter
        query: req.query // Pass query parameters directly
      })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'ProductByCategory are retrieved successfully',
        data: result
    })
})

const getMaxPrice = catchAsync(async (req, res) => {
    const result = await ProductServices.getMaxPriceFromDB()
    console.log({result})

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get max price successfully',
        data: result
    })
})



export const ProductControllers = {
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getAllProudcts,
    getProductByCategory,
    getMaxPrice
}