import { BaseLayout } from "./base-layout"
import { PublicHeader } from "./public-header"
import { PublicFooter } from "./public-footer"

type PublicLayoutProps = {
  children: React.ReactNode
  showHeader?: boolean
  showFooter?: boolean
}

export function PublicLayout(props: PublicLayoutProps) {
  return (
    <BaseLayout>
      {props.showHeader && (
        <PublicHeader />
      )}

      {props.children}

      {props.showFooter && (
        <PublicFooter />
      )}
    </BaseLayout>
  )
} 