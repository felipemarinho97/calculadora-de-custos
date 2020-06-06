import { Product } from "./../types/products.types";

export const ADD_PRODUCT: string = "ADD_PRODUCT";

export type AddProduct = {
  type: typeof ADD_PRODUCT;
  payload: Product;
};

export function addProduct(product: Product): AddProduct {
  return { type: ADD_PRODUCT, payload: product };
}

export const UPDATE_PRODUCT: string = "UPDATE_PRODUCT";

export type UpdateProduct = {
  type: typeof UPDATE_PRODUCT;
  payload: Product;
};

export function updateProduct(product: Product): UpdateProduct {
  return { type: UPDATE_PRODUCT, payload: product };
}

export const DELETE_PRODUCT: string = "DELETE_PRODUCT";

export type DeleteProduct = {
  type: typeof DELETE_PRODUCT;
  payload: string;
};

export function deleteProduct(productId: string): DeleteProduct {
  return { type: DELETE_PRODUCT, payload: productId };
}
