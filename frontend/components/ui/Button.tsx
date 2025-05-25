import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function Button({ label, ...props }: ButtonProps) {
  return (
    <button {...props} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
      {label}
    </button>
  );
}