import { Textarea } from "@/components/ui/textarea"

type TextAreaProps = {
    label: string
    register:any;
    name: string;
    errors:any;
    className?: string;
}

export function TextArea({
    label,
    register,
    name,
    errors,
  }:TextAreaProps) {
  return (
    <div className="grid w-full gap-1.5">
      <label htmlFor={`${name}`} className="block text-sm font-medium leading-6 text-gray-400">
       {label}
      </label>
      <Textarea {...register(`${name}`,{required:true})}
      id={`${name}`}
      name={`${name}`}
      />
    </div>
  )
}
