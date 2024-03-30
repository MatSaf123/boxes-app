import { RootState } from ".";

// TODO: move this type to types file
interface BoxCodenamePayload {
    partA?: string;
    partB?: string;
    partC?: string;
};

export const boxCodenameReducers = {
  setBoxCodename: (state: RootState, { payload } : { payload : BoxCodenamePayload) => {
    state.boxCodename.partOne = payload.partA;
    state.boxCodename.partTwo = payload.partB;
    state.boxCodename.partThree = payload.partC;
  },
};
