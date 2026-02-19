import { cn } from "@/lib/utils"

type LoaderProps = {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "primary" | "secondary"
  className?: string
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12"
}

const variantMap = {
  default: "border-gray-300 border-t-gray-800",
  primary: "border-gray-300 border-t-primary",
  secondary: "border-gray-300 border-t-secondary"
}

export function Loader({ 
  size = "md", 
  variant = "default",
  className 
}: LoaderProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "animate-spin rounded-full border-2",
          sizeMap[size],
          variantMap[variant],
          className
        )}
      />
    </div>
  )
} 