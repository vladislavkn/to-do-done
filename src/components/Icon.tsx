import React from "react";
import { SvgXml } from "react-native-svg";

const icons = {
  undone: `<svg viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1.5" y="2" width="21" height="21" rx="10.5" stroke="#F0F0F0" stroke-width="3"/>
  </svg>`,
  done: `<svg viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="1.5" width="22" height="22" rx="11" fill="#F0F0F0" stroke="#F0F0F0" stroke-width="2"/>
  <path d="M10.3409 14.7295L7.83523 12.2612L7 13.084L10.3409 16.375L17.5 9.32276L16.6648 8.5L10.3409 14.7295Z" fill="#999999" stroke="#999999"/>
  </svg>`,
};

type IconProps = {
  name: keyof typeof icons;
  width?: number;
  height?: number;
};

const Icon: React.FC<IconProps> = ({ name, width = 16, height = 16 }) => (
  <SvgXml xml={icons[name]} width={width} height={height} />
);

export default Icon;
