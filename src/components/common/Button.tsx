import cx from "classnames";

interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export function PrimaryButton({ className, ...props }: IButtonProps) {
  return (
    <Button className="primary-button" {...props}>
      {props.children}
    </Button>
  );
}

export function SecondaryButton({ className, ...props }: IButtonProps) {
  return (
    <Button className="secondary-button" {...props}>
      {props.children}
    </Button>
  );
}
export function Button({ className, ...props }: IButtonProps) {
  return <button className={cx(className)}>{props.children}</button>;
}
