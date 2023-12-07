interface IconDownDarkSvgType {
  color?: string;
  width?: string;
  height?: string;
}

export default function IconDown({
  color,
  width,
  height,
}: IconDownDarkSvgType) {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: color, width: width, height: height }}
    >
      <g id="icon-close">
        <path
          id="icon-close_2"
          d="M11.2998 5.20022L4.70017 11.7999M11.2998 11.7999L4.70017 5.20022"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
}
// icon-down-dark.svg
