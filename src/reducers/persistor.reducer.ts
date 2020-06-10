import { initialGasState } from "./gas.reducer";
import { initialProductsState } from "./products.reducer";
import { initialRecipesState } from "./recipes.reducer";
import { LOAD_STATE, LoadState } from "../actions/persistor.action";
import { IAppState } from "../App";
import rootReducer from "./index.reducer";

/**
 * Reducer that wraps the original application state.
 */
export type GlobalAction = LoadState | any;

export interface IPersistorState {
  root: IAppState;
}

export const initialIndexState: IAppState = {
  products: initialProductsState,
  recipes: initialRecipesState,
  gas: initialGasState,
};

const initialState: IPersistorState = {
  root: initialIndexState,
};

export function persistor(
  state: IPersistorState = initialState,
  action: GlobalAction
): IPersistorState {
  console.log(action);

  if (action.type === LOAD_STATE) {
    return { root: { ...initialState.root, ...action.payload } };
  }

  return { root: rootReducer(state.root, action) };
}
