import cx from "classnames";

interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

type ButtonStyles =
  | "primary-button"
  | "secondary-button"
  | "success-button"
  | "danger-button";

function styledButton(style: ButtonStyles) {
  return ({ className, ...props }: IButtonProps) => (
    <Button className={style} {...props}>
      {props.children}
    </Button>
  );
}

export const PrimaryButton = styledButton("primary-button");
export const SecondaryButton = styledButton("secondary-button");
export const SuccessButton = styledButton("success-button");
export const DangerButton = styledButton("danger-button");

export function Button({ className, ...props }: IButtonProps) {
  return (
    <button className={cx(className)} {...props}>
      {props.children}
    </button>
  );
}
