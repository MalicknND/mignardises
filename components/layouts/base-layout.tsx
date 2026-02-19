import { cn } from "@/lib/utils"

type BaseLayoutProps = {
  children: React.ReactNode
  className?: string
}

export function BaseLayout(props: BaseLayoutProps) {
  return (
    <main className={cn(
      "min-h-screen w-full bg-background",
      props.className
    )}>
      {props.children}
    </main>
  )
} 