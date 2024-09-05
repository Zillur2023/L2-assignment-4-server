// import { Product } from "../Product/product.model";
// import { Cart } from "./cart.model";

// const addToCart = async (userId, productId, quantity) => {
//     const product = await Product.findById(productId);
  
//     if (!product || product.stock < quantity) {
//       throw new Error('Product not found or insufficient stock');
//     }
  
//     let cart = await Cart.findOne({ userId });
//     if (!cart) {
//       cart = new Cart({ userId, products: [] });
//     }
  
//     const productIndex = cart.products.findIndex(
//       (item) => item.productId.toString() === productId
//     );
  
//     if (productIndex >= 0) {
//       cart.products[productIndex].quantity += quantity;
//     } else {
//       cart.products.push({ productId, quantity });
//     }
  
//     product.stock -= quantity;
//     await product.save();
//     await cart.save();
  
//     return { message: 'Product added to cart', cart };
//   };

//   export const CartService = {
//     addToCart
//   }