import { FC, InputHTMLAttributes } from "react";
import cn from 'classnames'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const BasicField: FC<Props> = (props) => {
  const { label, className, required, value, type = "text", ...rest } = props;
  return (
    <label
      className={cn("", {
        "flex flex-col text-md": label,
      })}
    >
      {label && (
        <span className="flex items-center">
          <p className="font-medium text-xl">{label}</p>
          {required && <span className="text-danger">*</span>}
        </span>
      )}
      <input
        type={type}
        required={required}
        value={type === "number" && value === 0 ? "" : value}
        onKeyDown={(event) => { if (type === "number" && event.key === '.') { event.preventDefault(); } }}
        className={cn(
          "text-black w-full rounded-lg px-5 py-3 placeholder:text-gray-300 read-only:cursor-default focus:border-gray-100 outline-fin-light-green read-only:focus:ring-0 2xl:py-3",
          {"bg-gray-50": !value},
          {"bg-white border border-gray-200": value},
          className
        )}
        {...rest}
      />
    </label>
  );
};