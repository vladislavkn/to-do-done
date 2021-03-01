import React from "react";
import useStore from "../store";
import { hasOverlaysSelector } from "../store/selectors";
import Overlay from "./Overlay";

const OverlayWrapper = () => {
  const hasOverlays = useStore(hasOverlaysSelector);

  return hasOverlays ? <Overlay /> : null;
};

export default OverlayWrapper;
