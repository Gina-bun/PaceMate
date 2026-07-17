

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    styles?: string;
}


export function Button({children, onClick, disabled, type, styles}: ButtonProps){

    return (
    
        <button 
           onClick={onClick} 
           disabled={disabled} 
           type={type} 
           className={` rounded-md py-2.5 px-1 cursor-pointer ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
           } ${styles}`}>
            {children}
        </button>
        
    )
}