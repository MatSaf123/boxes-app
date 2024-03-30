import Select from "react-select";
import { PartOption } from "../App";
import { BoxCodenamePartSelectWrapper } from "./style";

export const BoxCodenamePartSelect = (props: {
  options: PartOption[];
  placeholder?: string;
  onChange?: (newOption: PartOption | null) => void;
  isDisabled?: boolean;
  selected?: PartOption;
}) => (
  <BoxCodenamePartSelectWrapper>
    {/* TODO: idk how to properly style Select comp. without breaking props,
    thus the wrapper (still doesn't solve min-width selector issue) */}
    <Select
      value={props.selected}
      options={props.options}
      placeholder={props.placeholder}
      onChange={props.onChange}
      isDisabled={props.isDisabled}
    />
  </BoxCodenamePartSelectWrapper>
);
