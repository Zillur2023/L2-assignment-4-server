import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload:TUser) => {
 // checking if the user is exist
 const isUserExist = await User.isUserExistsByEmail(payload.email);
  
 if (isUserExist) {
   throw new AppError(httpStatus.ALREADY_REPORTED, 'This user is already exist!');
 }
  const result = await User.create(payload);

  return result;
};

const getUserFromDB = async () => {
  const result = await User.find();

  return result;
};
const getUserByIdFromDB = async (id: string = "66b6a03ec71ea2013edff57d") => {
  const result = await User.findById(id);

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getUserFromDB,
  getUserByIdFromDB,
};
