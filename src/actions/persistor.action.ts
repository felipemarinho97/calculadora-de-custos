import { IAppState } from "../App";

export const LOAD_STATE: string = "LOAD_STATE";
export type LoadState = { type: typeof LOAD_STATE; payload: IAppState };

export function loadState(state: IAppState): LoadState {
  return { type: LOAD_STATE, payload: state };
}
