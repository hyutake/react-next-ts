import { HTMLProps, MouseEventHandler } from "react";

interface ButtonProps {
    label: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: HTMLProps<HTMLElement>["className"];    // allows for styling to be overwritten entirely (may change to have a few fixed style values)
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
    const buttonClass = className ? className : "rounded border text-primary-blue-005 border-white bg-transparent px-4 py-2 hover:bg-primary-blue-005 hover:text-cool-gray-90";

    return (
        <button className={buttonClass} onClick={onClick}>
			{label}
		</button>
    )
}

export default Button;