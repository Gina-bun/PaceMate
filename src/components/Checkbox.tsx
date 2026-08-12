=interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

export function Checkbox({ checked, onChange, disabled = false }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={disabled ? undefined : onChange}
      disabled={disabled}
      className={`w-5 h-5 accent-orange-400 ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      }`}
    />
  );
}