import { Gas } from "./../types/gas.types";

export const UPDATE_GAS: string = "UPDATE_GAS";

export type UpdateGas = {
  type: typeof UPDATE_GAS;
  payload: Gas;
};

export function updateGas(gas: Gas): UpdateGas {
  return { type: UPDATE_GAS, payload: gas };
}
