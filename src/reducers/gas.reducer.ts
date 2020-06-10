import { UpdateGas, UPDATE_GAS } from "./../actions/gas.action";
import { Gas } from "./../types/gas.types";

export type IGasReduxState = Gas;

export const initialGasState: IGasReduxState = {
  gas: 0.225,
  gasPrice: 75,
};

export type GasAction = UpdateGas;

export function gasReducer(
  state: IGasReduxState = initialGasState,
  action: GasAction
): IGasReduxState {
  switch (action.type) {
    case UPDATE_GAS:
      return {
        ...state,
        gas: action.payload.gas,
        gasPrice: action.payload.gasPrice,
      };
    default:
      return state;
  }
}
