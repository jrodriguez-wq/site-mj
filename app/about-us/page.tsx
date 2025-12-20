"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { 
  Home, 
  Shield, 
  FileText, 
  DollarSign, 
  Heart, 
  ArrowRight,
  Users,
  Target,
  Quote,
  Award,
  TrendingUp
} from "lucide-react";

export default function AboutUsPage() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Home,
      value: t("statistics.stats.homesBuilt.value"),
      label: t("statistics.stats.homesBuilt.label"),
      description: t("statistics.stats.homesBuilt.description"),
    },
    {
      icon: Users,
      value: t("statistics.stats.happyFamilies.value"),
      label: t("statistics.stats.happyFamilies.label"),
      description: t("statistics.stats.happyFamilies.description"),
    },
    {
      icon: Award,
      value: t("statistics.stats.yearsExperience.value"),
      label: t("statistics.stats.yearsExperience.label"),
      description: t("statistics.stats.yearsExperience.description"),
    },
    {
      icon: DollarSign,
      value: t("statistics.stats.downPayment.value"),
      label: t("statistics.stats.downPayment.label"),
      description: t("statistics.stats.downPayment.description"),
    },
  ];

  const values = [
    {
      icon: Users,
      title: t("aboutUs.values.teamMentality.title"),
      description: t("aboutUs.values.teamMentality.description"),
    },
    {
      icon: Heart,
      title: t("aboutUs.values.winWin.title"),
      description: t("aboutUs.values.winWin.description"),
    },
    {
      icon: DollarSign,
      title: t("aboutUs.values.affordableHousing.title"),
      description: t("aboutUs.values.affordableHousing.description"),
    },
    {
      icon: Shield,
      title: t("aboutUs.values.ethicalBusiness.title"),
      description: t("aboutUs.values.ethicalBusiness.description"),
    },
  ];


  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Office Background */}
      <section className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/oficina.webp"
            alt={t("aboutUs.hero.imageAlt") || "M.J. Newell Homes Office"}
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
          {/* Gradient Overlay - Lighter for more natural look */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
        </div>

        {/* Content */}
        <div className="relative z-20 w-full h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="max-w-4xl">
              <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
                {/* Badge */}
                <div className="inline-block">
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/40" suppressHydrationWarning>
                    {t("aboutUs.hero.badge") || "About Us"}
                  </span>
                </div>

                {/* Title */}
                <h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.9] text-white"
                  style={{
                    textShadow: "0 4px 20px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.5)",
                  }}
                  suppressHydrationWarning
                >
                  {t("aboutUs.hero.title") || "Building Dreams, One Home at a Time"}
                </h1>

                {/* Subtitle */}
                <p 
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 font-medium max-w-3xl leading-relaxed"
                  style={{
                    textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)",
                  }}
                  suppressHydrationWarning
                >
                  {t("aboutUs.hero.subtitle") || "Over 15 years of experience building quality homes in Southwest Florida. Your family deserves the best."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Natural Fade Out - Smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-48 md:h-56 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
      </section>

      {/* Statistics Section */}
      <section className="py-10 md:py-14 lg:py-18 bg-background">
        <div className="container mx-auto px-4 sm:px-5 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight" suppressHydrationWarning>
                {t("statistics.title") || "Our Numbers Speak for Themselves"}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>
                {t("statistics.subtitle") || "The impact we've made in Southwest Florida"}
              </p>
              <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
            </div>

            {/* Stats Section */}
            <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="text-center space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-xl bg-muted/50 hover:bg-muted border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
                  >
                    <div className="flex justify-center">
                      <div className="p-3 sm:p-4 bg-primary/20 rounded-full border border-primary/40 shadow-lg shadow-primary/20">
                        <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                      </div>
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary" suppressHydrationWarning>
                        {stat.value}
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-black text-foreground" suppressHydrationWarning>{stat.label}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground px-1" suppressHydrationWarning>{stat.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Michael J. Newell Section */}
      <section className="py-10 md:py-14 lg:py-18 bg-background">
        <div className="container mx-auto px-4 sm:px-5 md:px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-block">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider px-4 py-2 bg-primary/10 rounded-full border border-primary/20" suppressHydrationWarning>
                  {t("aboutUs.leadership.badge") || "Leadership"}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight" suppressHydrationWarning>
                {t("aboutUs.leadership.title") || "Michael J. Newell"}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
                {t("aboutUs.leadership.subtitle") || "Founder & CEO of M.J. Newell Homes"}
              </p>
              <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Michael's Image */}
              <div className="relative w-full h-72 sm:h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20">
                <Image
                  src="/img/michael.webp"
                  alt="Michael J. Newell - Founder & CEO"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Description Text */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground" suppressHydrationWarning>
                    {t("aboutUs.leadership.description") || "Michael J. Newell applies a \"Win-Win\" approach to business, creating affordable housing for everyday Americans. He has applied a \"team mentality\" strategy at M.J. Newell Homes, resulting in enormous growth."}
                  </p>
                  
                  <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                    <div className="p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <Quote className="h-6 w-6 text-primary shrink-0 mt-1" />
                        <div>
                          <p className="text-base italic text-foreground leading-relaxed" suppressHydrationWarning>
                            {t("aboutUs.leadership.quote") || "\"The power of a team is crucial. You must recruit individuals who are both strong and trustworthy. I knew in order to be successful, I'd have to enlist first-line powerhouses.\""}
                          </p>
                          <p className="text-sm text-muted-foreground mt-2" suppressHydrationWarning>
                            {t("aboutUs.leadership.quoteAuthor") || "— Michael J. Newell"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <p className="text-base leading-relaxed text-muted-foreground" suppressHydrationWarning>
                  {t("aboutUs.leadership.belief") || "Michael strongly believes that managing a business means getting to know your employees and cultivating a culture of respect and appreciation. He has diligently invested hundreds of hours with each team member to achieve multi-linear success throughout the organization."}
                </p>

                {/* Mission and Vision Cards */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
                    <div className="p-5 space-y-3">
                      <h3 className="text-lg font-black flex items-center gap-2" suppressHydrationWarning>
                        <Award className="h-5 w-5 text-primary" />
                        {t("aboutUs.leadership.mission.title") || "Our Mission"}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed" suppressHydrationWarning>
                        {t("aboutUs.leadership.mission.text") || "\"We want to make prime-value homes available at an economical rate to all Americans. We believe that affordable housing should be no more than a quarter of their income.\""}
                      </p>
                    </div>
                  </Card>

                  <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
                    <div className="p-5 space-y-3">
                      <h3 className="text-lg font-black flex items-center gap-2" suppressHydrationWarning>
                        <TrendingUp className="h-5 w-5 text-primary" />
                        {t("aboutUs.leadership.vision.title") || "Vision for 2026"}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed" suppressHydrationWarning>
                        {t("aboutUs.leadership.vision.text") || "By 2026, M.J. Newell Homes continues to build quality homes and expand our Rent to Own program, helping more families achieve their dream of homeownership."}
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-10 md:py-14 lg:py-18 bg-foreground text-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-5 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-background tracking-tight" suppressHydrationWarning>
                {t("aboutUs.values.title") || "Our Core Values"}
              </h2>
              <p className="text-base md:text-lg text-background/80 max-w-2xl mx-auto" suppressHydrationWarning>
                {t("aboutUs.values.subtitle") || "The principles that guide everything we do"}
              </p>
              <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="border-2 border-background/20 bg-background/10 backdrop-blur-sm rounded-xl p-6 hover:border-primary/50 hover:bg-background/15 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/20 rounded-xl group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300 shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-black text-background">{value.title}</h3>
                        <p className="text-background/80 leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Full Team Photo Section */}
      <section className="py-10 md:py-14 lg:py-18 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-5 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <div className="inline-block">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider px-4 py-2 bg-primary/10 rounded-full border border-primary/20" suppressHydrationWarning>
                  {t("aboutUs.fullTeam.badge") || "Our Team"}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight" suppressHydrationWarning>
                {t("aboutUs.fullTeam.title") || "Building a Legacy Together"}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
                {t("aboutUs.fullTeam.subtitle") || "Meet the dedicated professionals who make M.J. Newell Homes a trusted name in Southwest Florida"}
              </p>
              <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
            </div>

            {/* Full Team Image */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20 bg-muted/20 group">
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9]">
                <Image
                  src="/img/team.webp"
                  alt={t("aboutUs.fullTeam.imageAlt") || "M.J. Newell Homes Team - Building a Legacy"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  priority
                />
                {/* Gradient overlay for better text readability if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
              
              {/* Optional badge overlay */}
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-white/80">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-foreground" suppressHydrationWarning>
                    {t("aboutUs.fullTeam.memberCount") || "17+ Team Members"}
                  </span>
                </div>
              </div>
            </div>

            {/* Team Description */}
            <div className="mt-8 md:mt-12">
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
                <div className="p-6 md:p-8 space-y-4">
                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground text-center max-w-3xl mx-auto" suppressHydrationWarning>
                    {t("aboutUs.fullTeam.description") || "Our team is the heart of M.J. Newell Homes. Each member brings expertise, dedication, and a shared commitment to building quality homes and helping families achieve their dreams of homeownership. Together, we're building not just houses, but a legacy of excellence in Southwest Florida."}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Michael & Juliana */}
      <section className="py-10 md:py-14 lg:py-18 bg-background">
        <div className="container mx-auto px-4 sm:px-5 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight" suppressHydrationWarning>
                {t("aboutUs.team.title") || "Leadership Team"}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
                {t("aboutUs.team.subtitle") || "360-degree support for your dreams"}
              </p>
              <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Michael J. Newell */}
              <div className="space-y-6">
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20 bg-muted/20">
                  <Image
                    src="/img/michael.webp"
                    alt="Michael J. Newell - Founder & CEO"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black mb-2" suppressHydrationWarning>
                      {t("aboutUs.leadership.title") || "Michael J. Newell"}
                    </h3>
                    <p className="text-lg font-semibold text-primary" suppressHydrationWarning>
                      {t("aboutUs.leadership.role") || "Founder & CEO"}
                    </p>
                  </div>
                  <p className="text-base leading-relaxed text-muted-foreground" suppressHydrationWarning>
                    {t("aboutUs.leadership.description") || "Michael J. Newell applies a \"Win-Win\" approach to business, creating affordable housing for everyday Americans. He has applied a \"team mentality\" strategy at M.J. Newell Homes, resulting in enormous growth."}
                  </p>
                </div>
              </div>

              {/* Juliana Bonilla */}
              <div className="space-y-6">
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20 bg-muted/20">
                  <Image
                    src="/img/juliana.webp"
                    alt="Juliana Bonilla - Administrative & Sales"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black mb-2" suppressHydrationWarning>
                      {t("aboutUs.team.juliana.name") || "Juliana Bonilla"}
                    </h3>
                    <p className="text-lg font-semibold text-primary" suppressHydrationWarning>
                      {t("aboutUs.team.juliana.role") || "Administrative & Sales"}
                    </p>
                  </div>
                  <p className="text-base leading-relaxed text-muted-foreground" suppressHydrationWarning>
                    {t("aboutUs.team.juliana.description") || "Juliana Bonilla brings expertise in administration and sales, ensuring smooth operations and excellent customer service. She is dedicated to helping families find their dream home."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Response Times Section */}
      <section className="py-10 md:py-14 lg:py-18 bg-foreground text-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-5 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-background tracking-tight" suppressHydrationWarning>
                {t("aboutUs.responseTimes.title") || "Fast Response Times"}
              </h2>
              <p className="text-base md:text-lg text-background/80 max-w-2xl mx-auto" suppressHydrationWarning>
                {t("aboutUs.responseTimes.subtitle") || "We value your time and respond quickly to all inquiries"}
              </p>
              <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="border-2 border-background/20 bg-background/10 backdrop-blur-sm rounded-xl p-6 text-center hover:border-primary/50 hover:bg-background/15 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-black text-primary mb-3" suppressHydrationWarning>
                  {t("aboutUs.responseTimes.phone.value") || "< 24h"}
                </div>
                <h3 className="text-lg md:text-xl font-black text-background mb-2" suppressHydrationWarning>
                  {t("aboutUs.responseTimes.phone.label") || "Phone Calls"}
                </h3>
                <p className="text-sm md:text-base text-background/80" suppressHydrationWarning>
                  {t("aboutUs.responseTimes.phone.description") || "We respond to all phone inquiries within 24 hours"}
                </p>
              </div>
              <div className="border-2 border-background/20 bg-background/10 backdrop-blur-sm rounded-xl p-6 text-center hover:border-primary/50 hover:bg-background/15 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-black text-primary mb-3" suppressHydrationWarning>
                  {t("aboutUs.responseTimes.email.value") || "< 48h"}
                </div>
                <h3 className="text-lg md:text-xl font-black text-background mb-2" suppressHydrationWarning>
                  {t("aboutUs.responseTimes.email.label") || "Email Inquiries"}
                </h3>
                <p className="text-sm md:text-base text-background/80" suppressHydrationWarning>
                  {t("aboutUs.responseTimes.email.description") || "Email responses within 48 hours"}
                </p>
              </div>
              <div className="border-2 border-background/20 bg-background/10 backdrop-blur-sm rounded-xl p-6 text-center hover:border-primary/50 hover:bg-background/15 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-black text-primary mb-3" suppressHydrationWarning>
                  {t("aboutUs.responseTimes.appointment.value") || "Same Day"}
                </div>
                <h3 className="text-lg md:text-xl font-black text-background mb-2" suppressHydrationWarning>
                  {t("aboutUs.responseTimes.appointment.label") || "Appointments"}
                </h3>
                <p className="text-sm md:text-base text-background/80" suppressHydrationWarning>
                  {t("aboutUs.responseTimes.appointment.description") || "Schedule your visit the same day"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Housing Crisis Commitment Section */}
      <section className="py-10 md:py-14 lg:py-18 bg-background">
        <div className="container mx-auto px-4 sm:px-5 md:px-6">
          <div className="max-w-6xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background overflow-hidden">
              <div className="p-8 md:p-12 space-y-6">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight" suppressHydrationWarning>
                    {t("aboutUs.housingCrisis.title") || "Solving the Affordable Housing Crisis"}
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>
                    {t("aboutUs.housingCrisis.description") || "Like most Americans, Michael Newell has watched the housing crisis continue to grow in the United States. As a result, he has strategically employed M.J. Newell Homes to help solve our country's predicament."}
                  </p>
                  <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-black flex items-center gap-2" suppressHydrationWarning>
                      <FileText className="h-5 w-5 text-primary" />
                      {t("aboutUs.housingCrisis.learnToBuild.title") || "Learn to Build Course"}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" suppressHydrationWarning>
                      {t("aboutUs.housingCrisis.learnToBuild.description") || "Michael Newell has created a course called \"Learn to Build,\" in which he details every building process step. He believes that by sharing his construction knowledge with others, this can ultimately impact the housing deficit in our nation."}
                    </p>
                    <p className="text-muted-foreground leading-relaxed italic" suppressHydrationWarning>
                      {t("aboutUs.housingCrisis.learnToBuild.quote") || "\"I feel that a new builder who comes into this industry will only strengthen the market. Our country needs good builders who can supply the growing demand for new construction.\""}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-black flex items-center gap-2" suppressHydrationWarning>
                      <Target className="h-5 w-5 text-primary" />
                      {t("aboutUs.housingCrisis.commitment.title") || "Our Commitment"}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" suppressHydrationWarning>
                      {t("aboutUs.housingCrisis.commitment.text") || "\"The advantages of business transparency has a positive domino-effect not just for me and my team, but for millions of other Americans. In a world where most people attempt to suppress others to gain power for themselves, we believe it's a detriment to society if we don't look for a win-win solution in business and help each other along the way.\""}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-10 md:py-14 lg:py-18 bg-foreground text-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-5 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <Card className="border-2 border-background/20 shadow-2xl bg-background/10 backdrop-blur-md">
              <div className="p-8 md:p-12 text-center space-y-6 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-background tracking-tight" suppressHydrationWarning>
                  {t("aboutUs.cta.title") || "Ready to Find Your Dream Home?"}
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-background/80" suppressHydrationWarning>
                  {t("aboutUs.cta.description") || "Let us guide you through the entire process of buying your new home."}
                </p>
                <div className="pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary text-primary-foreground px-8 py-6 text-base md:text-lg font-black shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all duration-300 group hover:scale-105"
                  >
                    <Link href="/contact">
                      {t("aboutUs.cta.button") || "Get in Touch"}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
