import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TCategory } from "./category.interface"
import { Category } from "./category.model"

const createCategoryIntoDB = async (payload: TCategory) => {
  
 
    const result = await Category.create(payload);
  
    return result;
  };

const getSingleCategoryFromDB = async (id:string) => {
    const result = await Category.findById(id)
    
    return result
}

const getAllCategoriesFromDB = async () => {
    const result = await Category.find()
    
    return result
}

export const CategoryServices = {
    createCategoryIntoDB,
    getSingleCategoryFromDB,
    getAllCategoriesFromDB
}