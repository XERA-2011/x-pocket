import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactNode,
  type ReactElement,
} from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background",
        secondary: "bg-secondary text-secondary-foreground",
        ghost: "",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const baseClassName = cn(
      buttonVariants({ variant, size, className }),
      "cursor-can-hover"
    );

    // 如果 asChild 为 true，我们需要将样式应用到第一个子元素
    if (asChild && isValidElement(children)) {
      const child = children as ReactElement;
      // 使用类型断言来避免 TypeScript 的严格检查
      return cloneElement(child, {
        ...props,
        className: cn(baseClassName, (child.props as { className?: string }).className),
        ref,
      } as Record<string, unknown>);
    }

    // 默认渲染为 button 元素
    return (
      <button
        className={cn(baseClassName, "pointer-events-auto")}
        ref={ref}
        {...props}
      >
        <span className="pointer-events-none">
          {children}
        </span>
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
