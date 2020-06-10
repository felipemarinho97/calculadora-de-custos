import React, { FC } from "react";
import "./App.less";
import Home from "./components/home/Home";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, CombinedState, Store } from "redux";
import { persistor } from "./reducers/persistor.reducer";
import { Provider, connect } from "react-redux";
import { IProductsReduxState } from "./types/products.types";
import { IRecipesReduxState } from "./types/recipes.types";
import { IGasReduxState } from "./reducers/gas.reducer";

export type IAppState = CombinedState<{
  products: IProductsReduxState;
  recipes: IRecipesReduxState;
  gas: IGasReduxState;
}>;

export const store: Store<IAppState> = createStore(persistor);

const App: FC = () => (
  <Router>
    <Provider store={store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  </Router>
);

export default App;
