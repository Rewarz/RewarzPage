"use client"

import { useState } from "react"
import Image from "next/image"
import { MousePointer, DollarSign, Clock, ChevronRight, Shield, Timer, TrendingUp, CheckCircle2 } from "lucide-react"

const platforms = [
  {
    id: 1,
    name: "AdWallet Click",
    logo: "/placeholder.svg?height=60&width=60",
    payPerClick: "$0.10 - $0.50",
    dailyLimit: 20,
    description: "Gana por cada interacción válida con anuncios premium.",
    requirements: "Click y 5 segundos de visualización",
    available: true,
    rating: 4.7,
    totalAds: 300,
  },
  {
    id: 2,
    name: "PropellerClicks",
    logo: "/placeholder.svg?height=60&width=60",
    payPerClick: "$0.05 - $0.25",
    dailyLimit: 30,
    description: "Mayor volumen de anuncios disponibles diariamente.",
    requirements: "Click y verificación simple",
    available: true,
    rating: 4.4,
    totalAds: 450,
  },
  {
    id: 3,
    name: "Adsterra Engage",
    logo: "/placeholder.svg?height=60&width=60",
    payPerClick: "$0.15 - $0.40",
    dailyLimit: 25,
    description: "Anuncios de alta calidad con mejor tasa de pago.",
    requirements: "Click y 3 segundos de interacción",
    available: true,
    rating: 4.6,
    totalAds: 250,
  },
  {
    id: 4,
    name: "Earnvertise Click",
    logo: "/placeholder.svg?height=60&width=60",
    payPerClick: "$0.08 - $0.30",
    dailyLimit: 35,
    description: "Plataforma ideal para principiantes.",
    requirements: "Solo click requerido",
    available: true,
    rating: 4.3,
    totalAds: 500,
  },
]

export default function VideoClicksPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<number | null>(null)

  return (
    <div className="  text-white">
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
              Gana dinero con <span className="text-green-500">clicks</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Obtén recompensas por cada interacción con anuncios. Simple, rápido y efectivo.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full">
                <MousePointer size={20} />
                <span>Click Simple</span>
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full">
                <DollarSign size={20} />
                <span>Pago Instantáneo</span>
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full">
                <Clock size={20} />
                <span>24/7 Disponible</span>
              </div>
            </div>
          </div>

          {/* How it Works */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Selecciona anuncios</h3>
              <p className="text-gray-400">
                Elige entre una amplia variedad de anuncios verificados de nuestros proveedores
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                <Timer size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactúa</h3>
              <p className="text-gray-400">Haz click y mantén la interacción según los requisitos del anuncio</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gana rewards</h3>
              <p className="text-gray-400">Recibe tu recompensa instantánea por cada interacción válida</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">Plataformas de Click</h2>
            <p className="text-gray-400 mb-8">Elige entre nuestros proveedores verificados y comienza a ganar</p>

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
                        selectedPlatform === platform.id ? "rotate-90" : ""
                      }`}
                    />
                  </div>

                  {selectedPlatform === platform.id && (
                    <div className="mt-6 pt-6 border-t border-gray-800 grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Pago por click</div>
                          <div className="text-2xl font-semibold text-green-500">{platform.payPerClick}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Límite diario</div>
                          <div className="text-2xl font-semibold">{platform.dailyLimit} clicks</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Anuncios disponibles</div>
                          <div className="text-2xl font-semibold">{platform.totalAds}+</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-3">Requisitos</div>
                        <div className="flex items-start gap-2 text-gray-300">
                          <CheckCircle2 size={20} className="text-green-500 mt-1" />
                          <p>{platform.requirements}</p>
                        </div>
                        <button className="w-full mt-6 bg-green-500 text-black font-medium px-6 py-3 rounded-lg hover:bg-green-400 transition-colors">
                          Comenzar a Ganar
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

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
              <p className="text-gray-400">Todo lo que necesitas saber sobre ganar con clicks</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">¿Cómo se validan los clicks?</h3>
                <p className="text-gray-400">
                  Cada plataforma tiene su propio sistema de validación. Generalmente requieren un tiempo mínimo de
                  interacción y verifican que el click sea genuino mediante diferentes tecnologías.
                </p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">¿Puedo usar varias plataformas?</h3>
                <p className="text-gray-400">
                  Sí, puedes utilizar todas las plataformas disponibles para maximizar tus ganancias, respetando los
                  límites diarios de cada una.
                </p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">¿Cuándo recibo mis ganancias?</h3>
                <p className="text-gray-400">
                  Las ganancias se acreditan instantáneamente después de que el click sea validado. Puedes retirar
                  cuando alcances el mínimo requerido en tu cuenta.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Comienza a ganar con clicks</h2>
            <p className="text-xl text-gray-300 mb-8">
              Una forma simple y efectiva de generar ingresos extra desde cualquier dispositivo
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

