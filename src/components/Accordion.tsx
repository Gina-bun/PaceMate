
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

export function Accordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button onClick={() => setOpen((prev) => !prev)} className="w-full flex justify-between items-center py-3 text-left">
        {title}
        <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-3 pl-4">{children}</div>}
    </div>
  );
}