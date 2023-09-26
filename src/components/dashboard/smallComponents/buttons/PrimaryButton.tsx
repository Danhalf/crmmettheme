interface ButtonProps {
    buttonText: string;
    disabled?: boolean;
    icon?: string;
    type?: 'primary' | 'light';
    buttonClickAction?: () => void;
}

export const PrimaryButton = ({
    buttonText,
    icon,
    disabled,
    buttonClickAction,
    type = 'primary',
}: ButtonProps) => {
    return (
        <button
            type='button'
            className={`btn btn-${type}`}
            onClick={buttonClickAction}
            disabled={disabled}
        >
            {icon && <i className={`ki-duotone ki-${icon} fs-2`}></i>}
            {buttonText}
        </button>
    );
};
