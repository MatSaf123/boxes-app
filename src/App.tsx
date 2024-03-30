import { MainContainer, BoxCodename } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { selectBoxCodenameParts } from "./selectors";
import { useEffect, useMemo, useState } from "react";
import { BoxCodenamePartSelect } from "./components/BoxPartSelect";
import { setBoxCodename } from "./index";
import { PartOption } from "./types";
import {
  boxCodenamePartOneOptions,
  boxCodenamePartTwoOptions,
} from "./boxParts";

export function App() {
  const dispatch = useDispatch();
  const [partOne, partTwo, partThree] = useSelector(selectBoxCodenameParts);

  const [selectedPartOne, setSelectedPartOne] = useState<PartOption | null>();
  const [selectedPartTwo, setSelectedPartTwo] = useState<PartOption | null>();
  const [selectedPartThree, setSelectedPartThree] =
    useState<PartOption | null>();

  const [availablePartsTwo, availablePartsThree, boxCodename] = useMemo(() => {
    const boxCodename =
      (partOne ?? "**") + "/" + (partTwo ?? "**") + "/" + (partThree ?? "**");

    const filteredPartTwoOptions = boxCodenamePartTwoOptions.filter((option) =>
      option.value.partOneDependencies?.includes(
        selectedPartOne?.value.name ?? ""
      )
    );

    const filteredPartThreeOptions = boxCodenamePartTwoOptions.filter(
      (option) =>
        option.value.partTwoDependencies?.includes(
          selectedPartTwo?.value.name ?? ""
        )
    );
    return [filteredPartTwoOptions, filteredPartThreeOptions, boxCodename];
  }, [partOne, partTwo, partThree]);

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
