import React from "react";
import {
  Overlay,
  OverlayInputProps as OverlayInputPropsCommon,
} from "../types";
import OverlayTextInput from "./OverlayTextInput";
import OverlayTimeInput from "./OverlayTimeInput";

type OverlayInputProps = Pick<Overlay, "inputType"> & OverlayInputPropsCommon;

const OverlayInput: React.FC<OverlayInputProps> = ({ inputType, ...rest }) => {
  switch (inputType) {
    case "text":
      return <OverlayTextInput {...rest} />;
    case "time":
      return <OverlayTimeInput {...rest} />;
    default:
      return null;
  }
};

export default OverlayInput;
