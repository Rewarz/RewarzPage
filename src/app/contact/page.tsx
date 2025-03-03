"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Clock, Send, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    
      const [isSubmitting, setIsSubmitting] = useState(false)
      const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
    
        try {
          // Validar el email
          if (!formData.email || !formData.email.includes("@")) {
            throw new Error("Email inválido")
          }
    
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
    
          const data = await response.json()
    
          if (!response.ok) {
            throw new Error(data.error || "Error al enviar el mensaje")
          }
    
          setSubmitStatus("success")
          setFormData({ name: "", email: "", subject: "", message: "" })
        } catch (error) {
          console.error("Error:", error)
          setSubmitStatus("error")
        } finally {
          setIsSubmitting(false)
          setTimeout(() => setSubmitStatus("idle"), 5000)
        }
      }
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }))
      }

  return (
    <main className="min-h-screen pt-24 pb-16 relative">
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />
      {/* Hero Section */}
      <section className="relative">
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contacta con Nosotros</h1>
            <p className="text-gray-400 text-lg">
              Estamos aquí para ayudarte. Nuestro equipo de soporte está disponible 24/7 para responder tus preguntas.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-400 mb-4">Envíanos un correo y te responderemos en breve</p>
                <a href="mailto:soporte@rewarz.com" className="text-green-500 hover:text-green-400 font-medium">
                  soporte@rewarz.com
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Horario de Atención</h3>
                <p className="text-gray-400">Lunes a Viernes: 9:00 - 20:00</p>
                <p className="text-gray-400">Sábado y Domingo: 10:00 - 18:00</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Envíanos un mensaje</h2>
              <p className="text-gray-400">
                Completa el formulario y nos pondremos en contacto contigo lo antes posible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-green-500"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-green-500"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Asunto
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-green-500"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="brand">Promociona tu marca</option>
                  <option value="cashback">Programa de Cashback</option>
                  <option value="help">Centro de Ayuda</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-green-500 resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg font-medium transition-colors
                  ${isSubmitting ? "bg-gray-700 cursor-not-allowed" : "bg-green-500 hover:bg-green-400 text-black"}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar mensaje
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-3 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  Mensaje enviado correctamente. Te responderemos pronto.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-4 py-3 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.
                </div>
              )}
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:sticky lg:top-24">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6">Información de contacto</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Ubicación</p>
                    <p className="text-gray-400">Argentina</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <a href="mailto:soporte@rewarz.com" className="text-gray-400 hover:text-green-500">
                      soporte@rewarz.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Horario de Atención</p>
                    <p className="text-gray-400">Lunes a Viernes: 9:00 - 20:00</p>
                    <p className="text-gray-400">Sábado y Domingo: 10:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
          <p className="text-gray-400">Encuentra respuestas a las preguntas más comunes sobre nuestros servicios.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-2">¿Cuál es el tiempo de respuesta?</h3>
            <p className="text-gray-400">
              Normalmente respondemos a todas las consultas en un plazo de 24 horas durante días laborables.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-2">¿Cómo puedo reportar un problema?</h3>
            <p className="text-gray-400">
              Puedes reportar problemas a través del formulario de contacto o directamente por correo electrónico.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-2">¿Ofrecen soporte en otros idiomas?</h3>
            <p className="text-gray-400">
              Sí, ofrecemos soporte en español e inglés. Próximamente añadiremos más idiomas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-2">¿Tienen oficina física?</h3>
            <p className="text-gray-400">
              Sí, puedes visitarnos en nuestra oficina principal durante el horario de atención.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

