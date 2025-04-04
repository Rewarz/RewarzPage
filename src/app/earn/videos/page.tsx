"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Play, DollarSign, Clock, ChevronRight, Shield, Timer, TrendingUp, CheckCircle2 } from "lucide-react"
import AdViewerModal from "@/app/components/ad-viewer-modal"

const platforms = [
  {
    id: 1,
    name: "AdWallet",
    logo: "/placeholder.svg?height=60&width=60",
    payPerVideo: "$0.50 - $2.00",
    dailyLimit: 4,
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
    dailyLimit: 4,
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
    dailyLimit: 4,
    description: "Anuncios premium de marcas reconocidas.",
    requirements: "Ver anuncio por 15 segundos",
    available: true,
    rating: 4.6,
    totalVideos: 200,
    provider: "adsterra",
  },
  {
    id: 4,
    name: "Earnvertise",
    logo: "/placeholder.svg?height=60&width=60",
    payPerVideo: "$0.20 - $0.80",
    dailyLimit: 4,
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
    dailyLimit: 4,
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
    dailyLimit: 4,
    description: "Ideal para principiantes, gran cantidad de contenido.",
    requirements: "Sin requisitos especiales",
    available: true,
    rating: 4.2,
    totalVideos: 500,
  },
]

export default function VideosPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedPlatform, setSelectedPlatform] = useState<number | null>(null)
  const [isAdModalOpen, setIsAdModalOpen] = useState(false)
  const [currentAdIndex, setCurrentAdIndex] = useState(0)
  const [viewedAdsCount, setViewedAdsCount] = useState(0)
  const [earnings, setEarnings] = useState(0)
  const [remainingViews, setRemainingViews] = useState(4)
  const [totalAvailableVideos, setTotalAvailableVideos] = useState(0)

  // Calcular el total de videos disponibles (4 videos por plataforma x 6 plataformas = 24)
  useEffect(() => {
    // Establecer un valor fijo de 24 (6 plataformas x 4 videos cada una)
    setTotalAvailableVideos(24)
  }, [])

  // Load saved state from localStorage and check server time
  useEffect(() => {
    if (status === "loading") return

    // Si el usuario no está autenticado, no cargar datos
    if (!session) {
      setViewedAdsCount(0)
      setRemainingViews(totalAvailableVideos)
      setEarnings(0)
      return
    }

    const userId = session.user?.email || "anonymous"
    const userKey = `adsterra_${userId}`

    // Primero, intentar cargar datos del localStorage
    const savedViewedAdsCount = localStorage.getItem(`${userKey}_viewed_count`)
    const savedEarnings = localStorage.getItem(`${userKey}_earnings`)
    const lastResetDate = localStorage.getItem(`${userKey}_last_reset`)

    // Cargar valores guardados temporalmente mientras verificamos con el servidor
    if (savedViewedAdsCount) {
      const count = Number.parseInt(savedViewedAdsCount)
      setViewedAdsCount(count)
      setRemainingViews(Math.max(0, totalAvailableVideos - count))
    }

    if (savedEarnings) {
      setEarnings(Number.parseFloat(savedEarnings))
    }

    // Verificar con el servidor para obtener la fecha correcta
    fetch("/api/get-server-time")
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          throw new Error("Error obteniendo la hora del servidor")
        }

        const serverDate = new Date(data.timestamp)
        // Usar solo la fecha sin la hora para comparar días
        const serverDateString = serverDate.toISOString().split("T")[0]

        console.log("Fecha del servidor:", serverDateString)
        console.log("Última fecha guardada:", lastResetDate)

        // Si no hay fecha guardada o la fecha es diferente (nuevo día)
        if (!lastResetDate || lastResetDate !== serverDateString) {
          console.log("Reiniciando contadores para nuevo día")
          // Reiniciar para nuevo día
          setViewedAdsCount(0)
          setRemainingViews(totalAvailableVideos)

          // Guardar nueva fecha y contadores reiniciados
          localStorage.setItem(`${userKey}_viewed_count`, "0")
          localStorage.setItem(`${userKey}_last_reset`, serverDateString)
        } else {
          console.log("Mismo día, manteniendo contadores")
          // Es el mismo día, mantener los valores cargados
        }
      })
      .catch((err) => {
        console.error("Error fetching server time:", err)
        // Fallback a fecha del cliente si falla el servidor
        const today = new Date().toISOString().split("T")[0]

        if (lastResetDate !== today) {
          setViewedAdsCount(0)
          setRemainingViews(totalAvailableVideos)
          localStorage.setItem(`${userKey}_viewed_count`, "0")
          localStorage.setItem(`${userKey}_last_reset`, today)
        }
      })
  }, [session, status, totalAvailableVideos])

  // Save state to localStorage when it changes
  useEffect(() => {
    if (!session) return

    const userId = session.user?.email || "anonymous"
    const userKey = `adsterra_${userId}`

    localStorage.setItem(`${userKey}_viewed_count`, viewedAdsCount.toString())
    localStorage.setItem(`${userKey}_earnings`, earnings.toString())
  }, [viewedAdsCount, earnings, session])

  // Cargar el script de Adsterra globalmente
  useEffect(() => {
    // Verificar si el script ya existe
    const existingScript = document.querySelector('script[src*="effectiveratecpm.com"]')

    if (!existingScript) {
      const script = document.createElement("script")
      script.async = true
      script.setAttribute("data-cfasync", "false")
      script.src = "//pl26017745.effectiveratecpm.com/1168d2b369a0985d6c4dbfd089c4f397/invoke.js"
      document.head.appendChild(script)

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
      }
    }
  }, [])

  const handleStartWatchingAds = (platformId: number) => {
    // Check if user is authenticated
    if (!session) {
      router.push("/login")
      return
    }

    const platform = platforms.find((p) => p.id === platformId)
    if (platform?.provider === "adsterra") {
      // Verificar si aún hay videos disponibles para esta plataforma específica
      const platformRemainingViews = Math.max(0, platform.dailyLimit - viewedAdsCount)

      if (platformRemainingViews > 0) {
        setIsAdModalOpen(true)
        setCurrentAdIndex(0)
      } else {
        alert(
          `Has alcanzado el límite diario de anuncios para ${platform.name}. Prueba con otra plataforma o vuelve mañana para ganar más recompensas.`,
        )
      }
    }
  }

  const handleAdCompleted = () => {
    // Update counts and earnings
    const newViewedCount = viewedAdsCount + 1
    setViewedAdsCount(newViewedCount)

    // Actualizar remainingViews basado en el total disponible
    setRemainingViews(Math.max(0, totalAvailableVideos - newViewedCount))

    // Add earnings (using the minimum value from the range)
    setEarnings((prev) => {
      const platform = platforms.find((p) => p.id === 3) // Adsterra
      if (platform) {
        const payRange = platform.payPerVideo
        const minPay = Number.parseFloat(payRange.split(" - ")[0].replace("$", ""))
        return prev + minPay
      }
      return prev
    })

    // Save to database if user is authenticated
    if (session) {
      fetch("/api/track-ad-view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user?.email,
          earnings: 0.3, // Fixed amount per view
        }),
      }).catch((err) => {
        console.error("Error tracking ad view:", err)
      })
    }
  }

  // Modificar la función handleNextAd para recargar el anuncio
  const handleNextAd = () => {
    if (currentAdIndex < 3) {
      // Asumiendo 4 anuncios en total (0-3)
      setCurrentAdIndex((prev) => prev + 1)

      // Eliminar script anterior para forzar recarga
      const existingScript = document.querySelector('script[src*="effectiveratecpm.com"]')
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript)
      }
    }
  }

  // Calcular los videos restantes específicamente para Adsterra
  const getAdsterraRemainingViews = () => {
    const adsterraPlatform = platforms.find((p) => p.provider === "adsterra")
    if (!adsterraPlatform) return 0

    return Math.max(0, adsterraPlatform.dailyLimit - viewedAdsCount)
  }

  return (
    <div className="text-white">
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

      {/* User Status Banner */}
      {!session && status !== "loading" && (
        <section className="py-4 bg-yellow-500/10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <p className="text-yellow-500 font-medium">
                  Inicia sesión para comenzar a ganar dinero viendo anuncios
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push("/login")}
                  className="px-4 py-2 bg-green-500 text-black font-medium rounded-lg hover:bg-green-400 transition-colors"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="px-4 py-2 border border-green-500/50 text-green-500 font-medium rounded-lg hover:bg-green-500/10 transition-colors"
                >
                  Registrarse
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Earnings Summary */}
      {session && (
        <section className="py-8 ">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-900/50 border border-gray-800 r rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Tu progreso de hoy</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Videos vistos</div>
                    <div className="text-2xl font-semibold">
                      {viewedAdsCount} / {totalAvailableVideos}
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(viewedAdsCount / totalAvailableVideos) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Ganancias de hoy</div>
                    <div className="text-2xl font-semibold text-green-500">${earnings.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Videos restantes</div>
                    <div className="text-2xl font-semibold">{remainingViews}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Platforms Section */}
      <section className="py-20">
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

                        {platform.provider === "adsterra" && (
                          <div>
                            <div className="text-sm text-gray-400 mb-1">Videos restantes hoy</div>
                            <div className="text-2xl font-semibold">
                              {Math.max(0, platform.dailyLimit - viewedAdsCount)}
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-3">Requisitos</div>
                        <div className="flex items-start gap-2 text-gray-300">
                          <CheckCircle2 size={20} className="text-green-500 mt-1" />
                          <p>{platform.requirements}</p>
                        </div>
                        <button
                          className={`w-full mt-6 font-medium px-6 py-3 rounded-lg transition-colors ${
                            !session
                              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                              : platform.provider === "adsterra" &&
                                  Math.max(0, platform.dailyLimit - viewedAdsCount) === 0
                                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                : "bg-green-500 text-black hover:bg-green-400"
                          }`}
                          onClick={() => handleStartWatchingAds(platform.id)}
                          disabled={
                            !session ||
                            (platform.provider === "adsterra" &&
                              Math.max(0, platform.dailyLimit - viewedAdsCount) === 0)
                          }
                        >
                          {!session
                            ? "Inicia sesión para ver videos"
                            : platform.provider === "adsterra" &&
                                Math.max(0, platform.dailyLimit - viewedAdsCount) === 0
                              ? "Límite diario alcanzado"
                              : "Comenzar a Ver Videos"}
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
              {!session ? (
                <>
                  <button
                    onClick={() => router.push("/login")}
                    className="bg-green-500 text-black font-medium px-8 py-3 rounded-lg hover:bg-green-400 transition-colors"
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => router.push("/register")}
                    className="border border-green-500/50 text-green-500 font-medium px-8 py-3 rounded-lg hover:bg-green-500/10 transition-colors"
                  >
                    Crear Cuenta
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="bg-green-500 text-black font-medium px-8 py-3 rounded-lg hover:bg-green-400 transition-colors"
                  >
                    Comenzar Ahora
                  </button>
                  <button className="border border-green-500/50 text-green-500 font-medium px-8 py-3 rounded-lg hover:bg-green-500/10 transition-colors">
                    Ver Tutorial
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Ad Viewer Modal */}
      <AdViewerModal
        isOpen={isAdModalOpen}
        onClose={() => setIsAdModalOpen(false)}
        onComplete={handleAdCompleted}
        currentAdIndex={currentAdIndex}
        totalAds={4}
        onNextAd={handleNextAd}
        remainingViews={getAdsterraRemainingViews()}
      />
    </div>
  )
}

