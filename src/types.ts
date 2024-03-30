export interface BoxCodenameState {
  partOne?: string | null;
  partTwo?: string | null;
  partThree?: string | null;
}

export interface BoxCodenamePayload {
  partOne?: string | null | undefined;
  partTwo?: string | null | undefined;
  partThree?: string | null | undefined;
}

export interface Part {
  name: string;
  // What previous option has to be selected in order to make this option available?
  partOneDependencies?: string[];
  partTwoDependencies?: string[];
}

export interface PartOption {
  value: Part;
  label: string;
}
