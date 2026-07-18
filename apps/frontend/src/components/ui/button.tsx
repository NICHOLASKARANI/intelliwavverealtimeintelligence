import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-gray-700 hover:bg-white/5 text-gray-300",
        ghost: "hover:bg-white/5 text-gray-400 hover:text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
})
Button.displayName = "Button"

export { Button, buttonVariants }
