import React from "react";

interface IIconProps extends React.PropsWithChildren<unknown> {
  size?: number;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  viewBox?: string;
  color?: string;
}

const Icon = ({
  size = 64,
  onClick,
  children,
  viewBox = "0 0 512 512",
  color = "black",
}: IIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={`${size}px`}
    height={`${size}px`}
    viewBox={viewBox}
    onClick={onClick}
  >
    {React.Children.map(children, (child) =>
      React.isValidElement(child)
        ? React.cloneElement(child, { ...child.props, color })
        : null
    )}
  </svg>
);

export const LayerPlusIcon = (props: IIconProps) => (
  <Icon {...props}>
    <path
      fill={props.color}
      d="M504 96h-88V8c0-4.42-3.58-8-8-8h-16c-4.42 0-8 3.58-8 8v88h-88c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h88v88c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8v-88h88c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8zm-6.77 270.71l-99.72-42.87 99.72-42.87c8.35-3.6 12.19-13.23 8.58-21.52-3.65-8.29-13.32-12.13-21.74-8.48l-225.32 96.86c-1.81.77-3.74.77-5.48 0L45.23 258.4l193.45-83.16c8.35-3.59 12.19-13.23 8.58-21.52-3.65-8.28-13.26-12.13-21.74-8.48L14.81 235.81C5.81 239.66 0 248.52 0 258.4c0 9.87 5.81 18.74 14.77 22.58l99.73 42.87-99.7 42.85C5.81 370.55 0 379.42 0 389.31c0 9.87 5.81 18.74 14.77 22.58l225.32 96.84c5.06 2.17 10.48 3.28 15.9 3.28s10.84-1.09 15.9-3.28l225.29-96.83c9-3.85 14.81-12.72 14.81-22.59.01-9.89-5.8-18.76-14.76-22.6zM258.74 478.72c-1.81.77-3.74.77-5.48 0L45.23 389.29 156 341.68l84.1 36.15c5.06 2.17 10.48 3.28 15.9 3.28s10.84-1.09 15.9-3.28l84.12-36.16 110.78 47.62-208.06 89.43z"
    />
  </Icon>
);

export const LayerMinusIcon = (props: IIconProps) => (
  <Icon {...props}>
    <path
      fill={props.color}
      d="M512 253.21c0-10.08-5.81-19.13-14.77-23.04L271.9 131.33c-10.06-4.43-21.74-4.43-31.81 0L14.81 230.15C5.81 234.08 0 243.13 0 253.21c0 10.08 5.81 19.13 14.77 23.04L114.5 320l-99.7 43.73C5.81 367.65 0 376.7 0 386.79c0 10.08 5.81 19.13 14.77 23.04l225.32 98.82c5.06 2.22 10.48 3.34 15.9 3.34s10.84-1.11 15.9-3.34l225.29-98.81c9-3.93 14.81-12.98 14.81-23.06 0-10.09-5.81-19.14-14.77-23.06l-99.72-43.75 99.69-43.73c9-3.91 14.81-12.96 14.81-23.03zm-45.19 133.57l-208.06 91.26c-1.81.78-3.74.78-5.48 0L45.23 386.78 156 338.2l84.1 36.89c5.06 2.22 10.48 3.34 15.9 3.34s10.84-1.11 15.9-3.34l84.12-36.9 110.79 48.59zm-208.07-42.31c-1.81.78-3.74.78-5.48 0L45.23 253.21l208.03-91.26c1.81-.78 3.74-.78 5.48 0l208.03 91.26-208.03 91.26zM504 64H296c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h208c4.42 0 8-3.58 8-8V72c0-4.42-3.58-8-8-8z"
    />
  </Icon>
);

export const EyeOpenIcon = (props: IIconProps) => (
  <Icon {...props} viewBox="0 0 576 512">
    <path
      fill={props.color}
      d="M288 288a64 64 0 0 0 0-128c-1 0-1.88.24-2.85.29a47.5 47.5 0 0 1-60.86 60.86c0 1-.29 1.88-.29 2.85a64 64 0 0 0 64 64zm284.52-46.6C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 96a128 128 0 1 1-128 128A128.14 128.14 0 0 1 288 96zm0 320c-107.36 0-205.46-61.31-256-160a294.78 294.78 0 0 1 129.78-129.33C140.91 153.69 128 187.17 128 224a160 160 0 0 0 320 0c0-36.83-12.91-70.31-33.78-97.33A294.78 294.78 0 0 1 544 256c-50.53 98.69-148.64 160-256 160z"
    />
  </Icon>
);

export const EyeClosedIcon = (props: IIconProps) => (
  <Icon {...props} viewBox="0 0 640 512">
    <path
      fill={props.color}
      d="M637 485.25L23 1.75A8 8 0 0 0 11.76 3l-10 12.51A8 8 0 0 0 3 26.75l614 483.5a8 8 0 0 0 11.25-1.25l10-12.51a8 8 0 0 0-1.25-11.24zM320 96a128.14 128.14 0 0 1 128 128c0 21.62-5.9 41.69-15.4 59.57l25.45 20C471.65 280.09 480 253.14 480 224c0-36.83-12.91-70.31-33.78-97.33A294.88 294.88 0 0 1 576.05 256a299.73 299.73 0 0 1-67.77 87.16l25.32 19.94c28.47-26.28 52.87-57.26 70.93-92.51a32.35 32.35 0 0 0 0-29.19C550.3 135.59 442.94 64 320 64a311.23 311.23 0 0 0-130.12 28.43l45.77 36C258.24 108.52 287.56 96 320 96zm60.86 146.83A63.15 63.15 0 0 0 320 160c-1 0-1.89.24-2.85.29a45.11 45.11 0 0 1-.24 32.19zm-217.62-49.16A154.29 154.29 0 0 0 160 224a159.39 159.39 0 0 0 226.27 145.29L356.69 346c-11.7 3.53-23.85 6-36.68 6A128.15 128.15 0 0 1 192 224c0-2.44.59-4.72.72-7.12zM320 416c-107.36 0-205.47-61.31-256-160 17.43-34 41.09-62.72 68.31-86.72l-25.86-20.37c-28.48 26.28-52.87 57.25-70.93 92.5a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448a311.25 311.25 0 0 0 130.12-28.43l-29.25-23C389.06 408.84 355.15 416 320 416z"
    />
  </Icon>
);
