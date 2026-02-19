'use client'
 
import { useEffect } from 'react'

import { AlertCircleIcon} from "lucide-react"
import { Button } from '@/components/ui/button'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <AlertCircleIcon className="w-10 h-10 text-red-500" />

      <h2>{error.message}</h2>
      
      <div className='flex items-center gap-2'>
        <Button onClick={() => reset()}>
          Try again
        </Button>
        <Button variant="outline" onClick={() => reset()}>
          Go back to home
        </Button>
      </div>
    </div>
  )
}