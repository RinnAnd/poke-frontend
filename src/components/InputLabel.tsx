import { Input } from "./ui/input";
import { Label } from "./ui/label";

type InputProps = {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  value?: string;
};

export function InputWithLabel({
  label,
  type,
  id,
  placeholder,
  value = undefined,
}: InputProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 text-white">
      <Label htmlFor={id}>{label}</Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        className="border border-zinc-700"
      />
    </div>
  );
}