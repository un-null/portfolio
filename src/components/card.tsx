import type { ComponentProps } from "react";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={`relative w-full text-left ring-1 ${className ?? ""}`}
      {...props}
    />
  );
}
