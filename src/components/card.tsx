import React from "react";

import { Slot } from "@radix-ui/react-slot";

import { cx } from "@/utils/cx";

interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, asChild, ...props }, forwardedRef) => {
    const Component = asChild ? Slot : "div";
    return (
      <Component
        ref={forwardedRef}
        className={cx("relative w-full p-6 text-left ring-1", className)}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";

export { Card, type CardProps };
