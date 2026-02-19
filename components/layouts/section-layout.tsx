import { cn } from "@/lib/utils"

type SectionLayoutProps = {
  id?: string
  children: React.ReactNode
  className?: string
}

export function SectionLayout(props: SectionLayoutProps) {
  return (
    <section id={props.id} className={cn(
      "px-4 py-20 md:px-6 lg:px-8 max-w-6xl mx-auto",
      props.className
    )}>
      {props.children}
    </section>
  )
} 