import { combineReducers } from "redux";
import { productsReducer } from "./products.reducer";
import { recipesReducer } from "./recipes.reducer";

const rootReducer = combineReducers({
  products: productsReducer,
  recipes: recipesReducer,
});

export default rootReducer;
