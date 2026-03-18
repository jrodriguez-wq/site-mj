"use client"

import Image from "next/image"
import { CreditCard, DollarSign, ArrowRight, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const handlePaymentRedirect = (url: string) => {
  window.location.href = url
}

export default function PayLinksPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <CreditCard className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Select Your Payment Method
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the amount you want to pay. The process is secure and fast.
          </p>
        </div>

        {/* Payment Options */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {/* Payment Option - $500 */}
          <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
            <CardHeader className="relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">$500 USD Payment</CardTitle>
              </div>
              <CardDescription className="text-base">
                Partial payment of $500 dollars
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">$500</span>
                  <span className="text-muted-foreground">USD</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Secure and fast process
                </p>
              </div>
            </CardContent>
            <CardFooter className="relative flex flex-col gap-4">
              <Button
                onClick={() =>
                  handlePaymentRedirect(
                    "https://50215941.hs-sites.com/hs/payments/jFmMCZtxNTn?referrer=PAYMENT_LINK"
                  )
                }
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                Proceed to Payment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="qr-500" className="border-0">
                  <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-4 h-4" />
                      Pay with QR
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col items-center gap-4 pt-2 pb-4">
                      <div className="p-4 bg-white rounded-lg border-2 border-border shadow-sm">
                        <Image
                          src="/payments/500.png"
                          alt="QR Code for $500 USD payment"
                          width={250}
                          height={250}
                          className="w-full h-auto"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Scan the QR code with your mobile device
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardFooter>
          </Card>
        </div>

        {/* Security Notice */}
        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground">
            🔒 Your payments are protected with SSL encryption
          </p>
        </div>
      </div>
    </div>
  )
}
