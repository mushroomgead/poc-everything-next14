type ButtonVariant = "operator" | "number" | "action";

interface CalculatorButtonProps {
  label: string;
  variant?: ButtonVariant;
  onClick: () => void;
  wide?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  operator: "bg-[#FF2D9B] text-white hover:brightness-110",
  number: "bg-gray-700 text-white hover:brightness-110",
  action: "bg-gray-400 text-black hover:brightness-110",
};

export default function CalculatorButton({
  label,
  variant = "number",
  onClick,
  wide = false,
}: CalculatorButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center rounded-full text-2xl font-medium transition-all active:scale-95 h-16 ${wide ? "col-span-2 w-full px-8 justify-start" : "w-16"} ${variantStyles[variant]}`}
      data-variant={variant}
    >
      {label}
    </button>
  );
}
