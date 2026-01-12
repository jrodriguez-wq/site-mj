import { redirect } from "next/navigation";

export default function NotFound() {
  // Redirigir inmediatamente a la página de inicio
  redirect("/");
}
