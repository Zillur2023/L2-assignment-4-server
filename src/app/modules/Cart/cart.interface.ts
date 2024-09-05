import { Types } from "mongoose";

export type TCartProduct = {
  productId: Types.ObjectId;
  quantity: number;
};

export type TCart = {
  userId?: Types.ObjectId;
  products: TCartProduct[];
};

