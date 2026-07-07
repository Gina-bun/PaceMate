interface TextInputProps {
  label: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
}

export function TextInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  helperText,
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  );
}