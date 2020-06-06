import { Recipe } from "./../types/recipes.types";

export const ADD_RECIPE: string = "ADD_RECIPE";

export type AddRecipe = {
  type: typeof ADD_RECIPE;
  payload: Recipe;
};

export function addRecipe(recipe: Recipe): AddRecipe {
  return { type: ADD_RECIPE, payload: recipe };
}

export const UPDATE_RECIPE: string = "UPDATE_RECIPE";

export type UpdateRecipe = {
  type: typeof UPDATE_RECIPE;
  payload: Recipe;
};

export function updateRecipe(recipe: Recipe): UpdateRecipe {
  return { type: UPDATE_RECIPE, payload: recipe };
}

export const DELETE_RECIPE: string = "DELETE_RECIPE";

export type DeleteRecipe = {
  type: typeof DELETE_RECIPE;
  payload: string;
};

export function deleteRecipe(recipeId: string): DeleteRecipe {
  return { type: DELETE_RECIPE, payload: recipeId };
}
