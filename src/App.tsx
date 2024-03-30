import { MainContainer, BoxCodename } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { selectBoxCodenameParts } from "./selectors";
import { useEffect, useMemo, useState } from "react";
import { BoxCodenamePartSelect } from "./components/BoxPartSelect";
import { setBoxCodename } from "./index"; // TODO: this seems like a bad idea, to import from index
import { PartOption } from "./types";

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

  const [selectedPartOne, setSelectedPartOne] = useState<PartOption | null>();
  const [selectedPartTwo, setSelectedPartTwo] = useState<PartOption | null>();

  const boxCodename = useMemo(
    () =>
      (partOne ?? "**") + "/" + (partTwo ?? "**") + "/" + (partThree ?? "**"),
    [partOne, partTwo, partThree]
  );

  useEffect(() => {
    dispatch(
      setBoxCodename({
        partOne: selectedPartOne?.value.name,
        partTwo: selectedPartTwo?.value.name,
      })
    );
  }, [selectedPartOne, selectedPartTwo]);

  return (
    <MainContainer>
      Boxes Page
      <BoxCodename>{boxCodename}</BoxCodename>
      <BoxCodenamePartSelect
        options={boxCodenamePartOneOptions}
        placeholder={"Select part one"}
        selected={selectedPartOne}
        onChange={(selectedOption: PartOption | null) => {
          setSelectedPartOne(selectedOption ?? undefined);
          if (selectedOption != null) {
            // Clean part two and part three becasue we need to show options with correct dependencies after change
            if (partTwo != null) {
              setSelectedPartTwo(null);
              // TODO: clean part three in future
            }
            // TODO: update filter for part two?
          }
        }}
      />
      <BoxCodenamePartSelect
        options={boxCodenamePartTwoOptions}
        placeholder={"Select part two"}
        selected={selectedPartTwo}
        isDisabled={partOne == null}
        onChange={(selectedOption: PartOption | null) => {
          if (selectedOption != null) {
            setSelectedPartTwo(selectedOption ?? null);
          }
        }}
      />
    </MainContainer>
  );
}
