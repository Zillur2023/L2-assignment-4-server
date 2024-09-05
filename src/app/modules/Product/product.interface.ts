import { Types } from "mongoose";

export const allProudctsSearchableFields = ['name'];

export type TProduct = {
    _id?:string;
    name: string;
    category: Types.ObjectId;
    price: number;
    stock: number;
    description: string;
    image: string;
}