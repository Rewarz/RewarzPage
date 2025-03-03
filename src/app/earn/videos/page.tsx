"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, DollarSign, Clock, ChevronRight, Shield, Timer, TrendingUp, CheckCircle2 } from "lucide-react"

const platforms = [
  {
    id: 1,
    name: "AdWallet",
    logo: "/placeholder.svg?height=60&width=60",
    payPerVideo: "$0.50 - $2.00",
    dailyLimit: 10,
    description: "Videos publicitarios de alta calidad con las mejores tasas de pago.",
    requirements: "Mínimo 30 segundos de visualización",
    available: true,
    rating: 4.8,
    totalVideos: 250,
  },
  {
    id: 2,
    name: "PropellerAds",
    logo: "/placeholder.svg?height=60&width=60",
    payPerVideo: "$0.25 - $1.00",
    dailyLimit: 15,
    description: "Gran variedad de contenido y pagos rápidos.",
    requirements: "Video completo requerido",
    available: true,
    rating: 4.5,
    totalVideos: 300,
  },
  {
    id: 3,
    name: "Adsterra",
    logo: "/placeholder.svg?height=60&width=60",
    payPerVideo: "$0.30 - $1.50",
    dailyLimit: 12,
    description: "Anuncios premium de marcas reconocidas.",
    requirements: "Interacción requerida",
    available: true,
    rating: 4.6,
    totalVideos: 200,
  },
  {
    id: 4,
    name: "Earnvertise",
    logo: "/placeholder.svg?height=60&width=60",
    payPerVideo: "$0.20 - $0.80",
    dailyLimit: 20,
    description: "Mayor cantidad de videos disponibles diariamente.",
    requirements: "Sin skip permitido",
    available: true,
    rating: 4.3,
    totalVideos: 400,
  },
  {
    id: 5,
    name: "Revcontent",
    logo: "/placeholder.svg?height=60&width=60",
    payPerVideo: "$0.40 - $1.80",
    dailyLimit: 8,
    description: "Contenido premium con altas tasas de conversión.",
    requirements: "Atención activa requerida",
    available: true,
    rating: 4.7,
    totalVideos: 180,
  },
  {
    id: 6,
    name: "Videobuddy",
    logo: "/placeholder.svg?height=60&width=60",
    payPerVideo: "$0.15 - $0.60",
    dailyLimit: 25,
    description: "Ideal para principiantes, gran cantidad de contenido.",
    requirements: "Sin requisitos especiales",
    available: true,
    rating: 4.2,
    totalVideos: 500,
  },
]

export default function VideosPage() {
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
              Gana dinero viendo <span className="text-green-500">videos</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Selecciona tu plataforma preferida y comienza a ganar recompensas por ver anuncios de video
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full">
                <Play size={20} />
                <span>Videos Cortos</span>
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full">
                <DollarSign size={20} />
                <span>Pagos Garantizados</span>
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full">
                <Clock size={20} />
                <span>Disponible 24/7</span>
              </div>
            </div>
          </div>

          {/* How it Works */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Elige tu plataforma</h3>
              <p className="text-gray-400">
                Selecciona entre nuestros proveedores verificados según tus preferencias de pago y contenido
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                <Timer size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mira los videos</h3>
              <p className="text-gray-400">
                Visualiza anuncios cortos y asegúrate de cumplir con los requisitos de cada plataforma
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Recibe recompensas</h3>
              <p className="text-gray-400">Acumula tus ganancias y retira cuando alcances el mínimo requerido</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">Plataformas Disponibles</h2>
            <p className="text-gray-400 mb-8">Selecciona la plataforma que mejor se adapte a tus necesidades</p>

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
                          <div className="text-sm text-gray-400 mb-1">Pago por video</div>
                          <div className="text-2xl font-semibold text-green-500">{platform.payPerVideo}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Límite diario</div>
                          <div className="text-2xl font-semibold">{platform.dailyLimit} videos</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Videos disponibles</div>
                          <div className="text-2xl font-semibold">{platform.totalVideos}+</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-3">Requisitos</div>
                        <div className="flex items-start gap-2 text-gray-300">
                          <CheckCircle2 size={20} className="text-green-500 mt-1" />
                          <p>{platform.requirements}</p>
                        </div>
                        <button className="w-full mt-6 bg-green-500 text-black font-medium px-6 py-3 rounded-lg hover:bg-green-400 transition-colors">
                          Comenzar a Ver Videos
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
              <p className="text-gray-400">Todo lo que necesitas saber sobre ganar dinero viendo videos</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">¿Cómo me aseguro de recibir el pago?</h3>
                <p className="text-gray-400">
                  Asegúrate de ver el video completo y cumplir con los requisitos específicos de cada plataforma. Los
                  pagos se procesan automáticamente una vez verificada la visualización.
                </p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">¿Puedo usar varias plataformas a la vez?</h3>
                <p className="text-gray-400">
                  Sí, puedes utilizar diferentes plataformas para maximizar tus ganancias, respetando los límites
                  diarios de cada una.
                </p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">¿Cuándo puedo retirar mis ganancias?</h3>
                <p className="text-gray-400">
                  Cada plataforma tiene su propio mínimo de retiro. Una vez alcanzado, podrás transferir tus ganancias a
                  tu cuenta bancaria o billetera digital.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Comienza a ganar dinero ahora</h2>
            <p className="text-xl text-gray-300 mb-8">
              No esperes más para empezar a generar ingresos extra desde la comodidad de tu hogar
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

