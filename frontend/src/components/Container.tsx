import { clsx } from "clsx";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export default function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Tag = as || "div";
  return (
    <Tag
      className={clsx("mx-auto max-w-3xl px-6 py-16", className)}
      {...props}
    />
  );
}
