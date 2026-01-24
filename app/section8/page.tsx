import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageContent } from "@/components/layout/page-container"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata"
import { SEO_CONFIG } from "@/config/seo"
import { LogoSlider } from "@/components/ui/logo-slider"
import { PARTNER_LOGOS } from "@/config/partner-logos"
import {
  CheckCircle2,
  Home,
  DollarSign,
  FileText,
  Users,
  Shield,
  ArrowRight,
  ExternalLink,
  Phone,
  Calendar,
} from "lucide-react"

export const metadata: Metadata = generateSEOMetadata({
  title: "Section 8 Housing Voucher Program | Use Your Government Benefits to Buy a Home | M.J. Newell Homes",
  description: "Learn how to use your Section 8 Housing Choice Voucher to buy your own home with M.J. Newell Homes. We accept Section 8 vouchers for our new construction homes in LaBelle and Lehigh Acres, Florida. Partner with AffordableHousing.com.",
  canonical: `${SEO_CONFIG.siteUrl}/section8`,
  keywords: [
    "section 8 florida",
    "housing choice voucher",
    "section 8 home buying",
    "affordable housing florida",
    "section 8 voucher program",
    "government housing assistance",
    "affordablehousing.com",
    "section 8 rent to own",
    "labelle section 8",
    "lehigh acres section 8",
    "section 8 new construction",
    "housing voucher florida",
  ],
  openGraph: {
    title: "Section 8 Housing Voucher Program | M.J. Newell Homes",
    description: "Use your Section 8 voucher to buy your own home. M.J. Newell Homes accepts Section 8 vouchers for new construction homes in Southwest Florida.",
    url: `${SEO_CONFIG.siteUrl}/section8`,
    type: "website",
  },
})

export default function Section8Page() {
  return (
    <PageContent size="lg">
      <div className="space-y-12 md:space-y-16 lg:space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-8 md:py-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Shield className="h-4 w-4" />
            <span>Government Housing Assistance Program</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-tight">
            Section 8 Housing Voucher Program
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Use your Section 8 Housing Choice Voucher to achieve your dream of homeownership. M.J. Newell Homes accepts Section 8 vouchers for our new construction homes in Southwest Florida.
          </p>

          {/* AffordableHousing.com Partnership Badge */}
          <div className="flex flex-col items-center justify-center gap-4 pt-4">
            <div className="flex items-center justify-center gap-4">
              <p className="text-sm text-muted-foreground">Proud Partner of</p>
              <Link
                href="https://www.affordablehousing.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Image
                  src="/hs.png"
                  alt="AffordableHousing.com Logo"
                  width={200}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </Link>
            </div>
            <Button
              asChild
              variant="outline"
              size="lg"
            >
              <Link
                href="https://www.affordablehousing.com/what-is-section8.aspx"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More on AffordableHousing.com
                <ExternalLink className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* What is Section 8 Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              What is Section 8?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
          </div>

          <Card className="border-2 shadow-lg">
            <CardContent className="pt-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  The <strong>Housing Choice Vouchers Program</strong>, also known as <strong>Section 8</strong>, provides assistance to eligible low- and moderate-income families to rent housing anywhere, not just in subsidized housing projects. The federal assistance program works as a rental subsidy that allows families to pay a reasonable amount of their income toward rent.
                </p>
                
                <div className="bg-primary/5 rounded-lg p-6 mb-6 border border-primary/20">
                  <p className="text-base md:text-lg font-semibold text-foreground mb-2">
                    Key Benefit:
                  </p>
                  <p className="text-base md:text-lg text-muted-foreground">
                    Generally, families will pay <strong>no more than 40 percent</strong> of their adjusted monthly income toward their rent share. The rental subsidy covers the rest.
                  </p>
                </div>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  Housing Choice Vouchers can be used in <strong>every major market in the United States</strong> and are administered locally by municipal public housing agencies (PHAs).
                </p>

                <div className="border-t border-border pt-6">
                  <Button
                    asChild
                    className="w-full sm:w-auto"
                  >
                    <Link
                      href="https://www.affordablehousing.com/what-is-section8.aspx"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read Official Section 8 Guide
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* How It Works Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              How Does It Work?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">1. Apply</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Interested families submit applications to the Housing Choice Voucher Program through public housing agencies (PHAs).
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">2. Get Approved</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  PHAs determine eligibility. If approved, you receive a Section 8 voucher.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">3. Find Housing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Find a suitable rental unit that must be inspected and approved by the PHA.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">4. Move In</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  The PHA pays the landlord the difference between your portion and the payment standard.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How to Apply Section */}
        <section className="space-y-8 bg-muted/30 rounded-2xl p-8 md:p-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              How Do I Apply for Section 8?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
          </div>

          <Card className="border-2 shadow-lg bg-background">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Create a Free Account</h3>
                    <p className="text-muted-foreground">
                      Create a free account on <Link href="https://www.affordablehousing.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium inline-flex items-center gap-1">AffordableHousing.com <ExternalLink className="h-4 w-4" /></Link> to search for open waiting lists in your area.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Search for Open Waiting Lists</h3>
                    <p className="text-muted-foreground">
                      Use AffordableHousing.com to search for open Section 8 waiting lists. The website makes it easy to find and apply to multiple waiting lists.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Apply Online</h3>
                    <p className="text-muted-foreground">
                      Many waiting lists operated through AffordableHousing.com allow you to apply directly online. For other waiting lists, you may need to contact the housing provider directly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Wait for Approval</h3>
                    <p className="text-muted-foreground">
                      Once you apply, you&apos;ll be placed on a waiting list. Wait times vary depending on local market conditions and the number of applicants.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="https://www.affordablehousing.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply on AffordableHousing.com
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Eligibility Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Who is Eligible?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Basic Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Must be at least 18 years old</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>U.S. citizen or eligible noncitizen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Single persons are eligible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Households with or without children</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-primary" />
                  Income Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">General Rule:</strong> Your income may not exceed <strong>50 percent</strong> of the median income for your county or metropolitan area.
                  </p>
                  <p>
                    <strong className="text-foreground">Priority:</strong> 75 percent of vouchers must go to applicants whose incomes don&apos;t exceed <strong>30 percent</strong> of the median income.
                  </p>
                  <p className="text-sm">
                    Contact your local PHA for specific income limits for your area and family size.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* M.J. Newell Homes Section */}
        <section className="space-y-8 bg-gradient-to-br from-primary/5 via-primary/10 to-background rounded-2xl p-8 md:p-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              How M.J. Newell Homes Helps You
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We&apos;re proud partners with AffordableHousing.com and accept Section 8 vouchers for our new construction homes in Southwest Florida.
            </p>
            
            {/* Partnership Logo */}
            <div className="flex items-center justify-center pt-4">
              <Link
                href="https://www.affordablehousing.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Image
                  src="/hsb.png"
                  alt="AffordableHousing.com Partnership"
                  width={250}
                  height={80}
                  className="h-16 w-auto object-contain"
                />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/modelos-optimized/louisiana/exterior/louisiana-exterior-01.webp"
                alt="New Construction Home Available for Section 8"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Our New Construction Homes</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">LaBelle, Florida</strong>
                      <p className="text-sm text-muted-foreground">Growing community with peaceful lifestyle, easy access to major cities, 1/4 acre lots, no HOA fees</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">Lehigh Acres, Florida</strong>
                      <p className="text-sm text-muted-foreground">Vibrant community with excellent schools, parks, shopping, and dining options</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Our Rent-to-Own Program</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>$0 Down Payment - No down payment required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>$0 Closing Costs - No closing costs to worry about</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Build Equity - Build equity while you rent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Improve Credit - Use this time to improve your credit score</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Lock in Price - Lock in today&apos;s prices for future purchase</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* More Information Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              More Information
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  Tenant Obligations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Families are responsible for finding suitable housing, providing income information, complying with lease terms, and maintaining the unit in good condition.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-6 w-6 text-primary" />
                  Landlord Obligations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Landlords must submit Request for Tenancy Approval, schedule housing quality inspections, and follow all program requirements.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Moving with Section 8
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  The program allows families to move without losing rental assistance. You must notify your PHA ahead of time and follow proper procedures.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Resources Section */}
        <section className="space-y-8 bg-muted/30 rounded-2xl p-8 md:p-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Resources & Links
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <Link
                    href="https://www.affordablehousing.com/what-is-section8.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Image
                      src="/hsn.png"
                      alt="AffordableHousing.com Section 8"
                      width={200}
                      height={60}
                      className="h-12 w-auto object-contain"
                    />
                  </Link>
                </div>
                <CardTitle className="flex items-center gap-2 text-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                  Official Section 8 Guide
                </CardTitle>
                <CardDescription className="text-center">
                  Complete official information about Section 8 from AffordableHousing.com
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  className="w-full"
                >
                  <Link
                    href="https://www.affordablehousing.com/what-is-section8.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Official Guide
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>AffordableHousing.com</CardTitle>
                <CardDescription>
                  The largest resource for affordable housing and Section 8 waiting lists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                >
                  <Link
                    href="https://www.affordablehousing.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit AffordableHousing.com
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Our Section 8 Guide</CardTitle>
                <CardDescription>
                  Read our comprehensive blog article about Section 8 and homeownership
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                >
                  <Link href="/blog/section-8-housing-voucher-program-florida">
                    Read Our Guide
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Partners/Allies Logo Slider */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Our Trusted Partners
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
          </div>

          <LogoSlider
            logos={PARTNER_LOGOS}
            speed="normal"
            pauseOnHover={true}
            showTitle={false}
          />
        </section>

        {/* CTA Section */}
        <section className="space-y-8">
          <Card className="border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background">
            <CardContent className="pt-12 pb-12 px-6 md:px-12 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-foreground">
                Ready to Use Your Section 8 Voucher?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Contact M.J. Newell Homes today to learn how we can help you use your Section 8 voucher to achieve your dream of homeownership.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="text-base md:text-lg px-8 py-6"
                >
                  <Link href="/contact">
                    <Phone className="h-5 w-5 mr-2" />
                    Contact Us
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-base md:text-lg px-8 py-6"
                >
                  <Link href="/schedule-appointment">
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule Appointment
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageContent>
  )
}
