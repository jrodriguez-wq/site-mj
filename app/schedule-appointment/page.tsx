import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { ScheduleAppointmentContent } from "@/components/schedule-appointment/schedule-appointment-content";

export const metadata = generateMetadata({
  title: "Schedule Appointment | Visit Our Homes | M.J. Newell Homes",
  description: "Schedule an appointment with M.J. Newell Homes. Visit our office in LaBelle, see our homes and models in person, and get a financial evaluation. Same-day appointments available.",
  canonical: `${SEO_CONFIG.siteUrl}/schedule-appointment`,
  keywords: [
    "schedule home viewing",
    "home appointment",
    "visit new homes",
    "home tour",
    "schedule visit",
    "home viewing appointment",
  ],
  openGraph: {
    title: "Schedule Appointment | M.J. Newell Homes",
    description: "Schedule an appointment to visit our homes and models in person. Same-day appointments available.",
    url: `${SEO_CONFIG.siteUrl}/schedule-appointment`,
    type: "website",
  },
});

export default function ScheduleAppointmentPage() {
  return <ScheduleAppointmentContent />;
}

