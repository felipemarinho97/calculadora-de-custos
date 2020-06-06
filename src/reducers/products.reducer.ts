import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "./../actions/products.action";
import { IProductsReduxState, Product } from "../types/products.types";
import {
  AddProduct,
  UpdateProduct,
  DeleteProduct,
} from "../actions/products.action";

const mockProducts: Product[] = [
  { id: "dsafa", name: "Catuaba", price: 7.5, unit: "ml", volume: 890 },
  {
    id: "dssadasdasdafa",
    name: "Farinha de Trigo",
    price: 3.5,
    unit: "Kg",
    volume: 1,
  },
];

export const initialProductsState: IProductsReduxState = {
  products: [...mockProducts],
};

export type ProductsAction = AddProduct | UpdateProduct | DeleteProduct;

export function productsReducer(
  state: IProductsReduxState = initialProductsState,
  action: ProductsAction
): IProductsReduxState {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, <Product>action.payload],
      };
    case UPDATE_PRODUCT:
      const toUpdate: Product = <Product>action.payload;

      return {
        ...state,
        products: state.products.map((product: Product) =>
          product.id === toUpdate.id ? toUpdate : product
        ),
      };
    case DELETE_PRODUCT:
      const idToRemove: string = <string>action.payload;

      return {
        ...state,
        products: state.products.filter(
          (product: Product) => product.id !== idToRemove
        ),
      };
    default:
      return state;
  }
}
