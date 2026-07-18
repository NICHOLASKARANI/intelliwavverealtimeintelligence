import * as React from "react"
const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-xl", className)} {...props} />
))
Card.displayName = "Card"

export { Card }
