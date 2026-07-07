
interface CardProps {
  variant: "subject" | "review" | "warmup" | "welcome" | "question" | "option";
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
};

export function Card({ variant, children, onClick }: CardProps) {
  return (
    <div onClick={onClick} className={`p-4 ${variantStyles[variant]}`}>
      {children}
    </div>
  );
}