import { combineReducers } from "redux";
import { productsReducer } from "./products.reducer";
import { recipesReducer } from "./recipes.reducer";
import { gasReducer } from "./gas.reducer";

const rootReducer = combineReducers({
  products: productsReducer,
  recipes: recipesReducer,
  gas: gasReducer,
});

export default rootReducer;
