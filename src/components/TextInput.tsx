interface TextInputProps {
  label: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
}

export function TextInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  helperText,
  error,
  disabled = false,
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-400 focus:ring-red-400"
            : "border-gray-300 focus:ring-orange-400"
        }
        ${disabled ? "bg-gray-50 text-gray-700 cursor-not-allowed" : "bg-white"}`}
      />
      {error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : (
        helperText && <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
