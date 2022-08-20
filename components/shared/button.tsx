import styles from './button.module.css';

import { MouseEventHandler, PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren<any> {
    className?: string;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <button type="button" onClick={props.disabled ? null : props.onClick} className={[styles.btn, props.className].join(' ')} disabled={props.disabled}>
            {props.children}
        </button>
    );

};

Button.defaultProps = {
    disabled: false,
};

export default Button;