import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

import { stripe } from '@/lib/stripe'

export default async function PaymentSuccessPage({ searchParams }: { searchParams: Promise<{ session_id: string }> }) {
  const { session_id } = await searchParams

  if (!stripe) throw new Error('Stripe is not initialized')

  if (!session_id)
    throw new Error('Not a valid Stripe session_id')

  const {
    status,
    customer_details: { email: customerEmail }
  }: any = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/profile')
  }

  if (status === 'complete') {
    return (
      <div className="container flex items-center justify-center min-h-[600px]">
        <Card className="w-[450px]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <CardTitle>Payment Successful!</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We appreciate your business! A confirmation email will be sent to{' '}
              <span className="font-medium text-foreground">{customerEmail}</span>. 
              If you have any questions, please email{' '}
              <a href="mailto:orders@example.com" className="text-primary hover:underline">
                orders@example.com
              </a>
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/profile" className="w-full">
              <Button className="w-full">Return to Profile</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }
}