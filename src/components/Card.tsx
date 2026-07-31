
interface CardProps {
  variant: "subject" | "review" | "warmup" | "welcome" | "question" | "option" | "action" | "tip" | "greeting" | "empty";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  padded?: boolean;
}

const variantStyles: Record<CardProps["variant"], string> = {
  subject: "rounded-md bg-white shadow-sm border border-gray-200",
  review: "rounded-md bg-orange-50 border border-orange-200",
  warmup: "rounded-md bg-amber-100 border border-amber-300",
  welcome: "rounded-md bg-white shadow-md border border-gray-200 h-full flex flex-col justify-center",
  question: "rounded-md bg-white shadow-sm border border-gray-200",
  option: "rounded-md bg-white border border-gray-200 cursor-pointer hover:border-orange-300",
  action: "rounded-md bg-orange-400 text-white shadow-sm",
  tip: "rounded-md bg-orange-300/40 border border-dashed border-orange-200",
  greeting: "rounded-md bg-gradient-to-br from-orange-400 to-amber-400 text-white shadow-md border border-orange-300",
  empty: "rounded-md bg-gray-100 border border-dashed border-gray-300",
};

export function Card({ variant, children, onClick, className = "", padded = true }: CardProps) {
  return (
    <div onClick={onClick} className={`${padded ? "p-4" : ""} h-full relative ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}