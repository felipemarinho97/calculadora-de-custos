import React, { FC } from "react";
import "./App.less";
import Home from "./components/home/Home";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, CombinedState, Store } from "redux";
import { persistor } from "./reducers/persistor.reducer";
import { Provider } from "react-redux";
import { IProductsReduxState } from "./types/products.types";
import { IRecipesReduxState } from "./types/recipes.types";

export type IAppState = CombinedState<{
  products: IProductsReduxState;
  recipes: IRecipesReduxState;
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
