export type VolumeUnits = "L" | "Kg" | "g" | "ml" | "Und";

export type Product = {
  id: string;
  name: string;
  price: number;
  volume: number;
  unit: VolumeUnits;
};

export interface IProductsReduxState {
  products: Product[];
}
