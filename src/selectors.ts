import { RootState } from "./index";

export const selectBoxCodenameParts = (state: RootState) => {
  // TODO: idk if separate parts should be held in redux state
  return [
    state.boxCodename.partOne,
    state.boxCodename.partTwo,
    state.boxCodename.partThree,
  ];
};
