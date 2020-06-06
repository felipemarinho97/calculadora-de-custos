import React, { Dispatch } from "react";
import { RecipesAction } from "../../../reducers/recipes.reducer";
import { updateRecipe, deleteRecipe } from "../../../actions/recipes.action";
import { connect } from "react-redux";
import { IAppState } from "../../../App";
import { List, Input } from "antd";
import { Recipe } from "../../../types/recipes.types";
import RecipeItem from "./RecipeItem";
import { Product } from "../../../types/products.types";
import { IPersistorState } from "../../../reducers/persistor.reducer";

const { Search } = Input;

interface IRecipesDisplayState {
  searchTerm: string;
}

class RecipesDisplay extends React.Component<
  IDispatchToProps & IStateToProps,
  IRecipesDisplayState
> {
  constructor(props: IDispatchToProps & IStateToProps) {
    super(props);

    this.state = {
      searchTerm: "",
    };

    this.onSearch = this.onSearch.bind(this);
  }

  private onSearch(value: string): void {
    this.setState({ searchTerm: value });
  }

  public render(): JSX.Element {
    const { recipes, deleteRecipe, products } = this.props;
    const { searchTerm } = this.state;

    const filteredRecipes: Recipe[] = recipes.filter((recipe: Recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log(searchTerm);

    return (
      <>
        <Search
          onSearch={this.onSearch}
          placeholder="Digite o nome de uma receita para pesquisar"
          style={{ width: 500, maxWidth: "70vw" }}
        />
        <List
          itemLayout="vertical"
          dataSource={filteredRecipes}
          renderItem={(recipe) => (
            <RecipeItem
              recipe={recipe}
              products={products}
              deleteRecipe={deleteRecipe}
            />
          )}
        />
      </>
    );
  }
}

interface IDispatchToProps {
  editRecipe: (recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
}

function mapDispatchToProps(
  dispatch: Dispatch<RecipesAction>
): IDispatchToProps {
  return {
    editRecipe: (recipe: Recipe) => {
      dispatch(updateRecipe(recipe));
    },
    deleteRecipe: (id: string) => {
      dispatch(deleteRecipe(id));
    },
  };
}

interface IStateToProps {
  recipes: Recipe[];
  products: Product[];
}

function mapStateToProps(state: IPersistorState): IStateToProps {
  return {
    recipes: state.root.recipes.recipes,
    products: state.root.products.products,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesDisplay);
