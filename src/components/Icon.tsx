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
  dailyDisabled: `<svg viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21.3333 3.16667V21.8333H2.66667V3.16667H21.3333ZM21.3333 0.5H2.66667C1.2 0.5 0 1.7 0 3.16667V21.8333C0 23.3 1.2 24.5 2.66667 24.5H21.3333C22.8 24.5 24 23.3 24 21.8333V3.16667C24 1.7 22.8 0.5 21.3333 0.5Z" fill="#999999"/>
  <path d="M14.6666 19.1667H5.33331V16.5H14.6666V19.1667ZM18.6666 13.8333H5.33331V11.1667H18.6666V13.8333ZM18.6666 8.50001H5.33331V5.83334H18.6666V8.50001Z" fill="#999999"/>
  </svg>`,
  categoriesDisabled: `<svg viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.66667 23.9999H0L0 -6.10352e-05H2.66667L2.66667 23.9999ZM8.00005 23.9999L8.00005 -6.10352e-05H5.33338L5.33338 23.9999H8.00005ZM13.3333 -6.10352e-05L13.3333 23.9999H10.6666L10.6666 -6.10352e-05H13.3333ZM18.6667 -6.10352e-05V23.9999H16L16 -6.10352e-05H18.6667Z" fill="#999999"/>
  </svg>`,
  add: `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="0.5" y="0.5" width="55" height="55" rx="27.5" fill="#F0F0F0" stroke="#CCCCCC"/>
  <path d="M40 29.7143H29.7143V40H26.2857V29.7143H16V26.2857H26.2857V16H29.7143V26.2857H40V29.7143Z" fill="#999999"/>
  </svg>`,
};

type IconProps = {
  name: keyof typeof icons;
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
