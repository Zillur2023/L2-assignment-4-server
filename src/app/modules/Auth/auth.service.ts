import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import config from "../../config";
import { TLoginUser } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";


const loginUser = async (payload: TLoginUser) => {
    // checking if the user is exist
    const isUserExist = await User.isUserExistsByEmail(payload.email);
  
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
  
    const isDeleted = isUserExist?.isDeleted;
  
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }
  
    // checking if the user is blocked
  
    const userStatus = isUserExist?.status;
  
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }
  
    //checking if the password is correct
  
    if (!(await User.isPasswordMatched(payload?.password, isUserExist?.password)))
      throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  
    //create token and sent to the  client
  
    const jwtPayload = {
      // userId: user.id,
      // _id: isUserExist._id,
      email: isUserExist.email,
      role: isUserExist.role,
    };
  
    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );
  
    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
    );
    // console.log('backEnd user --->',jwtPayload,)

    const user = {
      // _id: isUserExist?._id,
      name:isUserExist?.name,
      email:isUserExist?.email,
      role: isUserExist?.role
    }
  
    return {
      user,
      accessToken,
      refreshToken,
      needsPasswordChange: isUserExist?.needsPasswordChange,
    };
  };

  const refreshToken = async (token: string) => {
    // checking if the given token is valid
    // console.log({token})
    const decoded = verifyToken(token, config.jwt_refresh_secret as string);
  
    const { email, iat } = decoded;
  
    // checking if the user is exist
    const user = await User.isUserExistsByEmail(email);
  
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
  
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }
  
    // checking if the user is blocked
    const userStatus = user?.status;
  
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }
  
    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }
  
    const jwtPayload = {
      email: user.email,
      role: user.role,
    };
  
    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );
  
    return {
      accessToken,
    };
  };

  export const AuthServices = {
    loginUser,
    refreshToken
  }