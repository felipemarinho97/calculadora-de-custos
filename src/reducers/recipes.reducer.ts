import {
  ADD_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
} from "./../actions/recipes.action";
import { IRecipesReduxState, Recipe } from "../types/recipes.types";
import {
  AddRecipe,
  UpdateRecipe,
  DeleteRecipe,
} from "../actions/recipes.action";

const mockRecipes: Recipe[] = [
  {
    id: "asajpodjasodj",
    name: "Cuba Libre",
    items: [{ amount: 1, volume: 50, productId: "dsafa" }],
    preparationTime: 5,
    output: 1,
  },
];

export const initialRecipesState: IRecipesReduxState = {
  recipes: [...mockRecipes],
};

export type RecipesAction = AddRecipe | UpdateRecipe | DeleteRecipe;

export function recipesReducer(
  state: IRecipesReduxState = initialRecipesState,
  action: RecipesAction
): IRecipesReduxState {
  switch (action.type) {
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, <Recipe>action.payload],
      };
    case UPDATE_RECIPE:
      const toUpdate: Recipe = <Recipe>action.payload;

      return {
        ...state,
        recipes: state.recipes.map((recipe: Recipe) =>
          recipe.id === toUpdate.id ? toUpdate : recipe
        ),
      };
    case DELETE_RECIPE:
      const idToRemove: string = <string>action.payload;

      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe: Recipe) => recipe.id !== idToRemove
        ),
      };
    default:
      return state;
  }
}
