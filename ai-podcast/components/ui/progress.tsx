// components/ui/progress.tsx
"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  value?: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, onClick, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    onClick={onClick}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-black-5 cursor-pointer", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full bg-white-1 transition-all"
      style={{ width: `${value}%` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
