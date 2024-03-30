import { MainContainer, BoxCodename } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { selectBoxCodenameParts } from "./selectors";
import { useEffect, useMemo, useState } from "react";
import { BoxCodenamePartSelect } from "./components/BoxPartSelect";
import { setPartOne, setPartThree, setPartTwo } from ".";

// TODO: create a file for all types

export interface Part {
  name: string;
  dependencies?: string[]; // What previous option has to be selected in order to make this option available?
}

export interface PartOption {
  value: Part;
  label: string;
}

export const boxCodenamePartOneOptions: PartOption[] = [
  { value: { name: "Box A" }, label: "Box A" },
  { value: { name: "Box B" }, label: "Box B" },
  { value: { name: "Box C" }, label: "Box C" },
];

export const boxCodenamePartTwoOptions: PartOption[] = [
  {
    value: { name: "Thing 1", dependencies: ["Box A"] },
    label: "Thing 1 comp. with Box A",
  },
  {
    value: { name: "Thing 2", dependencies: ["Box A"] },
    label: "Thing 2 comp. with Box A",
  },
  {
    value: { name: "Thing 3", dependencies: ["Box B"] },
    label: "Thing 3 comp. with Box B",
  },
  {
    value: { name: "Thing 4", dependencies: ["Box A", "Box B"] },
    label: "Thing 4 comp. with Boxes A & B",
  },
  {
    value: { name: "Thing 5", dependencies: ["Box C"] },
    label: "Thing 5 comp. with Box C",
  },
];

export function App() {
  const dispatch = useDispatch();
  // TODO: resolve selector-returned-diff-value-with-same-params warning
  const [partOne, partTwo, partThree] = useSelector(selectBoxCodenameParts);

  const [selectedPartOne, setSelectedPartOne] = useState<PartOption>();
  const [selectedPartTwo, setSelectedPartTwo] = useState<PartOption>();

  const boxCodename = useMemo(
    () =>
      (partOne ?? "**") + "/" + (partTwo ?? "**") + "/" + (partThree ?? "**"),
    [partOne, partTwo, partThree],
  );

  useEffect(() => (
        dispatch(setBoxCodename)
      ), [selectedPartOne, selectedPartTwo]);

  return (
    <MainContainer>
      Boxes Page
      <BoxCodename>{boxCodename}</BoxCodename>
      <BoxCodenamePartSelect
        options={boxCodenamePartOneOptions}
        placeholder={"Select part one"}
        selected={selectedPartOne}
        onChange={(selectedOption) => {
          setSelectedPartOne(selectedOption ?? undefined);
          if (selectedOption != null) {
            // dispatch(setPartOne(selectedOption.value.name));
            // Clean part two and part three if they're not null because
            if (partTwo != null) {
              // dispatch(setPartTwo(null));
              setSelectedPartTwo(undefined);
            }
            // TODO: clean part three in future
            // TODO: update filter for part two?
          }
        }}
      />
      <BoxCodenamePartSelect
        options={boxCodenamePartTwoOptions}
        placeholder={"Select part two"}
        selected={selectedPartTwo}
        isDisabled={partOne == null}
        onChange={(selectedOption) => {
          if (selectedOption != null) {
            setSelectedPartTwo(selectedOption ?? undefined);
            // dispatch(setPartTwo(selectedOption.value.name));
          }
        }}
      />
    </MainContainer>
  );
}
