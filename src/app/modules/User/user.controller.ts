import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
    // const { password, student: studentData } = req.body;
  
    const result = await UserServices.createUserIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is created succesfully',
      data: result,
    });
  });

const getUser = catchAsync(async (req, res) => {
    const result = await UserServices.getUserFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User find successfully',
        data: result
    })
})
const getUserById = catchAsync(async (req, res) => {
    const {id} = req.params
    const result = await UserServices.getUserByIdFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User find successfully',
        data: result
    })
})

export const UserControllers = {
    createUser,
     getUser,
     getUserById
}