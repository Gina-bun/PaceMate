
interface CardProps {
  variant: "subject" | "review" | "warmup" | "welcome" | "question" | "option" | "action" | "tip";
  children: React.ReactNode;
  onClick?: () => void;
}

const variantStyles: Record<CardProps["variant"], string> = {
  subject: "rounded-md bg-white shadow-sm border border-gray-200",
  review: "rounded-md bg-orange-50 border border-orange-200",
  warmup: "rounded-md bg-amber-100 border border-amber-300",
  welcome: "rounded-md bg-white shadow-md border border-gray-200 h-full flex flex-col justify-center",
  question: "rounded-md bg-white shadow-sm border border-gray-200",
  option: "rounded-md bg-white border border-gray-200 cursor-pointer hover:border-orange-300",
  action: "rounded-md bg-orange-400 text-white shadow-sm",
  tip: "rounded-md bg-white border border-dashed border-orange-200",
};

export function Card({ variant, children, onClick }: CardProps) {
  return (
    <div onClick={onClick} className={`p-4 h-full ${variantStyles[variant]}`}>
      {children}
    </div>
  );
}