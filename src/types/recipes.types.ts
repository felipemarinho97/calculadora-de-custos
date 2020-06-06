export type RecipeItem = {
  productId: string;
  amount: number;
  volume: number;
};

export type Recipe = {
  id: string;
  name: string;
  items: RecipeItem[];
  preparationTime: number;
  output: number;
};

export interface IRecipesReduxState {
  recipes: Recipe[];
}
