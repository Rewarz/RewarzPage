"use client"

import { useState } from "react"
import Image from "next/image"
import { DollarSign, Clock, Brain, ChevronRight, CheckCircle2, Star, Award, Target } from 'lucide-react'

const platforms = [
  {
    id: 1,
    name: "SurveyPro",
    logo: "/placeholder.svg?height=60&width=60",
    payPerSurvey: "$1.00 - $5.00",
    dailyLimit: "5-10 encuestas",
    description: "Encuestas de alta calidad para marcas premium.",
    requirements: "Perfil completo y verificado",
    available: true,
    rating: 4.8,
    avgTime: "15-20 min",
    topics: ["Tecnología", "Consumo", "Entretenimiento"],
    totalSurveys: 200
  },
  {
    id: 2,
    name: "OpinionRewards",
    logo: "/placeholder.svg?height=60&width=60",
    payPerSurvey: "$0.50 - $3.00",
    dailyLimit: "8-12 encuestas",
    description: "Gran variedad de encuestas cortas y rápidas.",
    requirements: "Email verificado",
    available: true,
    rating: 4.6,
    avgTime: "5-10 min",
    topics: ["Productos", "Servicios", "Opinión"],
    totalSurveys: 300
  },
  {
    id: 3,
    name: "GlobalSurveys",
    logo: "/placeholder.svg?height=60&width=60",
    payPerSurvey: "$2.00 - $10.00",
    dailyLimit: "3-5 encuestas",
    description: "Estudios de mercado internacionales con mejor paga.",
    requirements: "Perfil detallado requerido",
    available: true,
    rating: 4.9,
    avgTime: "20-30 min",
    topics: ["Investigación", "Mercado", "Tendencias"],
    totalSurveys: 150
  },
  {
    id: 4,
    name: "QuickPolls",
    logo: "/placeholder.svg?height=60&width=60",
    payPerSurvey: "$0.25 - $1.00",
    dailyLimit: "15-20 encuestas",
    description: "Encuestas rápidas ideales para principiantes.",
    requirements: "Sin requisitos especiales",
    available: true,
    rating: 4.3,
    avgTime: "2-5 min",
    topics: ["Opinión General", "Preferencias", "Hábitos"],
    totalSurveys: 500
  }
]

export default function SurveysPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<number | null>(null)

  return (
    <div className=" text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-60">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent opacity-30" />
        
        {/* Green Light Effect */}
        <div className="absolute top-60 left-1/2 -translate-x-1/2 w-[500px] h-[500px]">
          <div className="absolute inset-0 bg-green-500/20 blur-[100px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Gana dinero compartiendo tu <span className="text-green-500">opinión</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Participa en encuestas y estudios de mercado. Tu opinión vale, y mucho.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full">
                <Brain size={20} />
                <span>Encuestas Verificadas</span>
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full">
                <DollarSign size={20} />
                <span>Mejor Paga</span>
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full">
                <Clock size={20} />
                <span>Pago Rápido</span>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Encuestas Relevantes</h3>
              <p className="text-gray-400">
                Recibe encuestas adaptadas a tu perfil y preferencias
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bonos Especiales</h3>
              <p className="text-gray-400">
                Gana bonos extra por encuestas consecutivas y referencias
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Programa VIP</h3>
              <p className="text-gray-400">
                Accede a encuestas exclusivas y mejores pagos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">Plataformas de Encuestas</h2>
            <p className="text-gray-400 mb-8">
              Selecciona las encuestas que mejor se adapten a ti
            </p>
            
            <div className="grid gap-6">
              {platforms.map((platform) => (
                <div 
                  key={platform.id}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedPlatform(platform.id === selectedPlatform ? null : platform.id)}
                >
                  <div className="flex items-center gap-6">
                    <Image
                      src={platform.logo || "/placeholder.svg"}
                      alt={platform.name}
                      width={60}
                      height={60}
                      className="rounded-xl"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-1">
                        <h3 className="text-xl font-semibold">{platform.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-yellow-500">
                          <span>★</span>
                          <span>{platform.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-400">{platform.description}</p>
                    </div>
                    <ChevronRight 
                      size={24} 
                      className={`text-gray-400 transition-transform ${
                        selectedPlatform === platform.id ? 'rotate-90' : ''
                      }`}
                    />
                  </div>

                  {selectedPlatform === platform.id && (
                    <div className="mt-6 pt-6 border-t border-gray-800 grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Pago por encuesta</div>
                          <div className="text-2xl font-semibold text-green-500">{platform.payPerSurvey}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Tiempo promedio</div>
                          <div className="text-2xl font-semibold">{platform.avgTime}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Encuestas disponibles</div>
                          <div className="text-2xl font-semibold">{platform.totalSurveys}+</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-2">Temas principales</div>
                          <div className="flex flex-wrap gap-2">
                            {platform.topics.map((topic, index) => (
                              <span 
                                key={index}
                                className="bg-green-500/10 text-green-500 text-sm px-3 py-1 rounded-full"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-3">Requisitos</div>
                        <div className="flex items-start gap-2 text-gray-300">
                          <CheckCircle2 size={20} className="text-green-500 mt-1" />
                          <p>{platform.requirements}</p>
                        </div>
                        <button className="w-full mt-6 bg-green-500 text-black font-medium px-6 py-3 rounded-lg hover:bg-green-400 transition-colors">
                          Comenzar Encuestas
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Consejos para Maximizar tus Ganancias</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Completa tu Perfil</h3>
                    <p className="text-gray-400">
                      Un perfil detallado te ayuda a recibir encuestas más relevantes y mejor pagadas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Sé Consistente</h3>
                    <p className="text-gray-400">
                      Responde con honestidad y mantén respuestas consistentes para no ser descalificado.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Actúa Rápido</h3>
                    <p className="text-gray-400">
                      Las mejores encuestas se llenan rápido. Activa las notificaciones para no perdértelas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <span className="font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Diversifica</h3>
                    <p className="text-gray-400">
                      Utiliza múltiples plataformas para aumentar tus oportunidades de ganar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
              <p className="text-gray-400">Todo lo que necesitas saber sobre las encuestas</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">¿Por qué me descalifican de algunas encuestas?</h3>
                <p className="text-gray-400">
                  Las encuestas buscan perfiles específicos. Si no cumples con los criterios demográficos o de 
                  comportamiento, podrías ser descalificado. No te preocupes, ¡siempre hay más encuestas disponibles!
                </p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">¿Cuánto puedo ganar al mes?</h3>
                <p className="text-gray-400">
                  Las ganancias varían según tu dedicación y las encuestas disponibles. Un usuario activo puede 
                  ganar entre $50 y $200 al mes completando encuestas regularmente.
                </p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">¿Cómo me aseguro de recibir el pago?</h3>
                <p className="text-gray-400">
                  Completa las encuestas honestamente y sigue todas las instrucciones. Los pagos se procesan 
                  automáticamente una vez verificadas las respuestas válidas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-t from-green-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tu opinión es valiosa
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Comienza a ganar dinero compartiendo tu punto de vista sobre productos y servicios
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-500 text-black font-medium px-8 py-3 rounded-lg hover:bg-green-400 transition-colors">
                Comenzar Ahora
              </button>
              <button className="border border-green-500/50 text-green-500 font-medium px-8 py-3 rounded-lg hover:bg-green-500/10 transition-colors">
                Ver Tutorial
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
