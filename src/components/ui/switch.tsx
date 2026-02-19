"use client";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function Switch({ checked, onCheckedChange }: SwitchProps) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`h-6 w-12 rounded-full p-1 transition ${checked ? "bg-primary" : "bg-border"}`}
    >
      <span className={`block h-4 w-4 rounded-full bg-white transition ${checked ? "translate-x-6" : "translate-x-0"}`} />
    </button>
  );
}
