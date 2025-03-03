import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    // Validar el email
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    // Enviar email al administrador
    const { data: adminEmail, error: adminError } = await resend.emails.send({
      from: "Rewarz <onboarding@resend.dev>", // Cambia esto por tu dominio verificado cuando lo tengas
      to: ["contacto.rewarz@gmail.com"], // Tu email donde recibirás los mensajes
      replyTo: email,
      subject: `Nuevo mensaje de contacto: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Nuevo mensaje de contacto</title>
          </head>
          <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f6f9fc;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #22c55e; margin-bottom: 20px;">Nuevo mensaje de contacto</h2>
              
              <div style="margin-bottom: 20px;">
                <p style="margin: 10px 0;"><strong>Nombre:</strong> ${name}</p>
                <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 10px 0;"><strong>Asunto:</strong> ${subject}</p>
              </div>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">

              <div style="margin-bottom: 20px;">
                <p style="margin: 10px 0;"><strong>Mensaje:</strong></p>
                <p style="white-space: pre-wrap; margin: 10px 0; color: #374151;">${message}</p>
              </div>

              <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
                Este mensaje fue enviado desde el formulario de contacto de Rewarz.
              </p>
            </div>
          </body>
        </html>
      `,
    })

    // Enviar confirmación al usuario
    const {  error: userError } = await resend.emails.send({
      from: "Rewarz <onboarding@resend.dev>", // Cambia esto por tu dominio verificado
      to: [email],
      subject: "Hemos recibido tu mensaje - Rewarz",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Confirmación de mensaje</title>
          </head>
          <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f6f9fc;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #22c55e; margin-bottom: 20px;">¡Gracias por contactarnos!</h2>
              
              <p style="margin: 10px 0;">Hola ${name},</p>
              
              <p style="margin: 20px 0;">
                Hemos recibido tu mensaje correctamente. Nuestro equipo revisará tu consulta y te responderemos lo antes posible.
              </p>

              <div style="background-color: #f8fafc; border-radius: 4px; padding: 15px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Asunto:</strong> ${subject}</p>
                <p style="margin: 5px 0;"><strong>Tu mensaje:</strong></p>
                <p style="white-space: pre-wrap; margin: 10px 0; color: #374151;">${message}</p>
              </div>

              <p style="margin: 20px 0;">
                Si tienes alguna pregunta adicional, no dudes en responder a este email.
              </p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">

              <p style="color: #6b7280; font-size: 12px;">
                Este es un mensaje automático de confirmación. Por favor, no respondas directamente a este email.
              </p>
            </div>
          </body>
        </html>
      `,
    })

    if (adminError || userError) {
      console.error("Error sending email:", adminError || userError)
      return NextResponse.json({ error: "Error al enviar el mensaje" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      messageId: adminEmail?.id,
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Error al enviar el mensaje" }, { status: 500 })
  }
}

