import React from "react";
import { SvgXml } from "react-native-svg";
import { icons } from "../icons";
import { IconName } from "../types";

type IconProps = {
  name: IconName;
  width?: number;
  height?: number;
  [key: string]: any;
};

const Icon: React.FC<IconProps> = ({
  name,
  width = 16,
  height = 16,
  ...rest
}) => <SvgXml xml={icons[name]} width={width} height={height} {...rest} />;

export default Icon;
