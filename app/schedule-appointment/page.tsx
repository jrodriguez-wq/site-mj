import { generateMetadata } from "@/lib/seo/metadata";
import { ScheduleAppointmentContent } from "@/components/schedule-appointment/schedule-appointment-content";

export const metadata = generateMetadata({
  title: "Schedule Appointment",
  description: "Schedule an appointment with M.J. Newell Homes. Visit our office, see our homes and models in person, and get a financial evaluation.",
});

export default function ScheduleAppointmentPage() {
  return <ScheduleAppointmentContent />;
}

