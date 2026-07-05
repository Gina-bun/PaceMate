

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    type?: "button" | "submit" | "reset";
    styles?: string;
}


export function Button({children, onClick, type, styles}: ButtonProps){

    return (
        <>
        <button onClick={onClick} type={type} className={` rounded-md py-2.5 px-1 cursor-pointer ${styles}`}>
            {children}
        </button>
        </>
    )
}