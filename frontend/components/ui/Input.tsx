import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: InputProps) {
  return <input {...props} className="w-full p-2 border border-gray-300 rounded" />;
}