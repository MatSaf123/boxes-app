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
    value: { name: "Thing 1", partOneDependencies: ["Box A"] },
    label: "Thing 1 (needs Box A)",
  },
  {
    value: { name: "Thing 2", partOneDependencies: ["Box A"] },
    label: "Thing 2 (needs Box A)",
  },
  {
    value: { name: "Thing 3", partOneDependencies: ["Box B"] },
    label: "Thing 3 (needs Box B)",
  },
  {
    value: { name: "Thing 4", partOneDependencies: ["Box A", "Box B"] },
    label: "Thing 4 (needs Box A or B)",
  },
  {
    value: { name: "Thing 5", partOneDependencies: ["Box C"] },
    label: "Thing 5 (needs Box C)",
  },
];

export const boxCodenamePartThreeOptions: PartOption[] = [
  {
    value: {
      name: "Foo",
      partOneDependencies: ["Box A"],
      partTwoDependencies: ["Thing 1"],
    },
    label: "Foo (needs BoxA, Thing 1)",
  },
  {
    value: {
      name: "Bar",
      partOneDependencies: ["Box B"],
      partTwoDependencies: ["Thing 2", "Thing 3"],
    },
    label: "Bar (needs BoxB, Thing 2&3)",
  },
  {
    value: {
      name: "Baz",
      partOneDependencies: ["Box C"],
      partTwoDependencies: ["Thing 4", "Thing 5"],
    },
    label: "Baz (needs BoxC, Thing 4&5)",
  },
];

export function App() {
  const dispatch = useDispatch();
  // TODO: resolve selector-returned-diff-value-with-same-params warning
  const [partOne, partTwo, partThree] = useSelector(selectBoxCodenameParts);

  const [selectedPartOne, setSelectedPartOne] = useState<PartOption | null>();
  const [selectedPartTwo, setSelectedPartTwo] = useState<PartOption | null>();
  const [selectedPartThree, setSelectedPartThree] =
    useState<PartOption | null>();

  const boxCodename = useMemo(
    () =>
      (partOne ?? "**") + "/" + (partTwo ?? "**") + "/" + (partThree ?? "**"),
    [partOne, partTwo, partThree]
  );

  // TODO: I can probably put logic below into useMemo above
  const availablePartsTwo = useMemo(
    () =>
      boxCodenamePartTwoOptions.filter((option) =>
        option.value.partOneDependencies?.includes(
          selectedPartOne?.value.name ?? ""
        )
      ),
    [partOne]
  );

  // TODO: same as above
  const availablePartsThree = useMemo(
    () =>
      boxCodenamePartThreeOptions.filter((option) =>
        option.value.partTwoDependencies?.includes(
          selectedPartTwo?.value.name ?? ""
        )
      ),
    [partOne, partTwo]
  );

  useEffect(() => {
    dispatch(
      setBoxCodename({
        partOne: selectedPartOne?.value.name,
        partTwo: selectedPartTwo?.value.name,
        partThree: selectedPartThree?.value.name,
      })
    );
  }, [selectedPartOne, selectedPartTwo, selectedPartThree]);

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
          if (selectedOption != null && selectedOption != selectedPartOne) {
            // Clean part two and part three because we need to show options with correct dependencies after change
            if (partTwo != null || partThree != null) {
              setSelectedPartTwo(null);
              setSelectedPartThree(null);
            }
          }
        }}
      />
      <BoxCodenamePartSelect
        options={availablePartsTwo}
        placeholder={"Select part two"}
        selected={selectedPartTwo}
        isDisabled={partOne == null}
        onChange={(selectedOption: PartOption | null) => {
          if (selectedOption != null && selectedOption != selectedPartTwo) {
            setSelectedPartTwo(selectedOption ?? null);
            // Clean part three because we need to show options with correct dependencies after change
            if (partThree != null) {
              setSelectedPartThree(null);
            }
          }
        }}
      />
      <BoxCodenamePartSelect
        options={availablePartsThree}
        placeholder={"Select part three"}
        selected={selectedPartThree}
        isDisabled={partTwo == null}
        onChange={(selectedOption: PartOption | null) => {
          if (selectedOption != null && selectedOption != selectedPartThree) {
            setSelectedPartThree(selectedOption ?? null);
          }
        }}
      />
    </MainContainer>
  );
}
