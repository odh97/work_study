interface IconDownDarkSvgType {
  color?: string;
  width?: string;
  height?: string;
}

export default function IconClose({
  color,
  width,
  height,
}: IconDownDarkSvgType) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: color, width: width, height: height }}
    >
      <g id="icon-down-dark">
        <path
          id="icon-down"
          d="M3.33337 6L8.00004 10.6667L12.6667 6"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
}
