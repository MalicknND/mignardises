import { Suspense } from 'react'
import { ResetPasswordForm } from './_components/ResetPasswordForm'

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}
