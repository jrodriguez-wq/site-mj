/**
 * EJEMPLO DE USO DEL COMPONENTE HubSpotForm
 * 
 * Este archivo muestra cómo usar el componente HubSpotForm.
 * Puedes eliminar este archivo después de implementar el formulario.
 */

import { HubSpotForm } from "./hubspot-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Ejemplo 1: Uso básico
 * 
 * Reemplaza el formulario actual en contact/page.tsx con esto:
 */
export const ExampleBasic = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Send us a Message</CardTitle>
        <CardDescription>
          Fill out the form below and we&apos;ll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <HubSpotForm
          portalId="12345678" // Reemplaza con tu Portal ID
          formId="abc12345-def6-7890-ghij-klmnopqrstuv" // Reemplaza con tu Form ID
        />
      </CardContent>
    </Card>
  )
}

/**
 * Ejemplo 2: Con clases personalizadas
 */
export const ExampleWithCustomStyles = () => {
  return (
    <HubSpotForm
      portalId="12345678"
      formId="abc12345-def6-7890-ghij-klmnopqrstuv"
      className="my-custom-class"
    />
  )
}

/**
 * Ejemplo 3: Con región personalizada (si tu cuenta de HubSpot está en otra región)
 */
export const ExampleWithRegion = () => {
  return (
    <HubSpotForm
      portalId="12345678"
      formId="abc12345-def6-7890-ghij-klmnopqrstuv"
      region="eu1" // Para cuentas europeas
    />
  )
}

/**
 * CÓMO OBTENER EL PORTAL ID Y FORM ID:
 * 
 * 1. Ve a tu cuenta de HubSpot
 * 2. Navega a Marketing > Forms
 * 3. Selecciona el formulario que quieres usar
 * 4. Haz clic en "Share" o "Embed"
 * 5. Copia el código embed que te proporciona
 * 
 * El código se verá algo así:
 * 
 * <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
 * <script>
 *   hbspt.forms.create({
 *     region: "na1",
 *     portalId: "12345678",  <-- Este es tu portalId
 *     formId: "abc12345-def6-7890-ghij-klmnopqrstuv"  <-- Este es tu formId
 *   });
 * </script>
 * 
 * Extrae esos valores y úsalos en el componente HubSpotForm.
 */

