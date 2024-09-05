import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { Category } from "../Category/category.model";
import { allProudctsSearchableFields, TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (payload: TProduct) => {
  const category = await Category.findById(payload.category)
  if(!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'This category not found')
  }
  const result = await Product.create(payload);

  return result;
};

const getSingleProductFromDB = async (id: string, body: any) => {
  const result = await Product.findById(id);

  return result;
};

const updateProductIntoDB = async (payload : Record<string,unknown>) => {
  const product = await Product.findById(payload._id).populate('category');
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  product.set(payload);
  await product.save();

  return product;
};

const deleteProductFromDB = async (id: string) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return product;
};



const getAllProudctsFromDB = async (query: Record<string, unknown>) => {
  const allProductsQuery = new QueryBuilder(Product.find().populate('category'), query)
    .search(allProudctsSearchableFields)
    .filter()
    .sort()
    .fields();

  const result = await allProductsQuery.modelQuery;
  const meta = await allProductsQuery.countTotal();

  return {
    meta,
    result,
  };
};


const getProductByCategoryFromDB = async ({ category, query }:any) => {
  const productByCategory = new QueryBuilder(Product.find({ category }).populate('category'), query)
    .search(allProudctsSearchableFields)
    .filter()
    .sort()
    .fields();

  const result = await productByCategory.modelQuery;
  const meta = await productByCategory.countTotal();

  return {
    meta,
    result,
  };
};

// const getProductByCategoryFromDB = async (categoryId: string) => {
//   const result = await Product.find({ categoryId });

//   return result;
// };

const getMaxPriceFromDB = async () => {
  const products = await Product.find();
  console.log({products})

  const result = Math.max(...products.map((product:any) => product.price))
  console.log('maxPrice',result)

  return result;
};


export const ProductServices = {
  createProductIntoDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  getAllProudctsFromDB,
  getProductByCategoryFromDB,
  getMaxPriceFromDB
};
