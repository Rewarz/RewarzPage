"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { X, ChevronRight, Clock, AlertTriangle } from "lucide-react"

interface AdViewerModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  currentAdIndex: number
  totalAds: number
  onNextAd: () => void
  remainingViews: number
}

export default function AdViewerModal({
  isOpen,
  onClose,
  onComplete,
  currentAdIndex,
  totalAds,
  onNextAd,
  remainingViews,
}: AdViewerModalProps) {
  const [timeRemaining, setTimeRemaining] = useState(15)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showRewardMessage, setShowRewardMessage] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [scriptError, setScriptError] = useState(false)
  const adContainerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const prevAdIndexRef = useRef(currentAdIndex)
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  // Reset timer when ad changes or modal opens
  useEffect(() => {
    if (isOpen) {
      // Solo reiniciar si realmente cambió el índice del anuncio
      if (prevAdIndexRef.current !== currentAdIndex) {
        setTimeRemaining(15)
        setIsCompleted(false)
        setIsPaused(false)
        setShowRewardMessage(false)
        setScriptLoaded(false)
        setScriptError(false)
        prevAdIndexRef.current = currentAdIndex
      } else if (prevAdIndexRef.current === 0 && currentAdIndex === 0) {
        // Primera apertura del modal
        setTimeRemaining(15)
        setIsCompleted(false)
        setIsPaused(false)
        setShowRewardMessage(false)
        setScriptLoaded(false)
        setScriptError(false)
      }
    }
  }, [isOpen, currentAdIndex])

  // Función para limpiar scripts y elementos relacionados con anuncios
  const cleanupAds = useCallback(() => {
    // Eliminar scripts
    const existingScripts = document.querySelectorAll(
      'script[src*="effectiveratecpm.com"], script[src*="highperformanceformat.com"]',
    )
    existingScripts.forEach((script) => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    })

    // Eliminar iframes que puedan haber sido creados por los anuncios
    const adIframes = document.querySelectorAll('iframe[src*="effectiveratecpm"], iframe[src*="highperformanceformat"]')
    adIframes.forEach((iframe) => {
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe)
      }
    })

    // Eliminar cualquier div con ID específico de anuncios
    const adContainer = document.getElementById("container-1168d2b369a0985d6c4dbfd089c4f397")
    if (adContainer && adContainer.parentNode) {
      adContainer.parentNode.removeChild(adContainer)
    }

    // Eliminar contenedores específicos para scripts 3 y 4
    const socialBarContainer = document.getElementById("socialbar-container")
    if (socialBarContainer && socialBarContainer.parentNode) {
      socialBarContainer.parentNode.removeChild(socialBarContainer)
    }

    const popunderContainer = document.getElementById("popunder-container")
    if (popunderContainer && popunderContainer.parentNode) {
      popunderContainer.parentNode.removeChild(popunderContainer)
    }

    // Limpiar cualquier otro elemento que pueda haber sido creado por los scripts
    document.querySelectorAll('[id*="ScriptRoot"], [id*="ad-container"], [class*="ad-container"]').forEach((el) => {
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      }
    })

    // Eliminar el script guardado en la referencia
    if (scriptRef.current && scriptRef.current.parentNode) {
      scriptRef.current.parentNode.removeChild(scriptRef.current)
      scriptRef.current = null
    }
  }, [])

  // Función para cargar un script con manejo de eventos
  const loadScript = useCallback(
    (src: string, container: HTMLElement | Document = document.body, async = true, defer = true): Promise<void> => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script")
        script.type = "text/javascript"
        script.src = src
        script.async = async
        script.defer = defer

        script.onload = () => {
          console.log(`Script loaded successfully: ${src}`)
          setScriptLoaded(true)
          resolve()
        }

        script.onerror = (error) => {
          console.error(`Error loading script: ${src}`, error)
          setScriptError(true)
          reject(error)
        }

        container.appendChild(script)
        scriptRef.current = script
      })
    },
    [],
  )

  // Initialize ad script when component mounts or ad changes
  useEffect(() => {
    if (isOpen) {
      // Limpiar antes de agregar nuevos anuncios
      cleanupAds()
      setScriptLoaded(false)
      setScriptError(false)

      if (adContainerRef.current) {
        // Clear previous ad content
        adContainerRef.current.innerHTML = ""
      }

      // Usar 4 scripts distintos según el índice actual
      if (currentAdIndex === 0) {
        // Native Banner
        if (adContainerRef.current) {
          const container = document.createElement("div")
          container.id = "container-1168d2b369a0985d6c4dbfd089c4f397"
          adContainerRef.current.appendChild(container)

          // Cargar el script con manejo de eventos
          loadScript(
            "//pl26017745.effectiveratecpm.com/1168d2b369a0985d6c4dbfd089c4f397/invoke.js",
            document.head,
          ).catch((error) => console.error("Error loading Native Banner script:", error))
        }
      } else if (currentAdIndex === 1) {
        // Banner
        if (adContainerRef.current) {
          const container = document.createElement("div")
          adContainerRef.current.appendChild(container)

          // Crear script de opciones
          const optionsScript = document.createElement("script")
          optionsScript.type = "text/javascript"
          optionsScript.text = `
            atOptions = {
              'key' : '8592fc2e6fcf3138efee1d71a81ac279',
              'format' : 'iframe',
              'height' : 300,
              'width' : 160,
              'params' : {}
            };
          `
          container.appendChild(optionsScript)

          // Cargar el script con manejo de eventos
          loadScript("//www.highperformanceformat.com/8592fc2e6fcf3138efee1d71a81ac279/invoke.js", container).catch(
            (error) => console.error("Error loading Banner script:", error),
          )
        }
      } else if (currentAdIndex === 2) {
        // SocialBar - Implementación con manejo de eventos
        if (adContainerRef.current) {
          // Crear un contenedor específico para el SocialBar
          const container = document.createElement("div")
          container.id = "socialbar-container"
          container.className = "socialbar-container w-full h-full"
          adContainerRef.current.appendChild(container)

          // Asegurarse de que el DOM esté listo antes de cargar el script
          setTimeout(() => {
            // Cargar el script con manejo de eventos
            loadScript(
              "//pl26018299.effectiveratecpm.com/51/11/d8/5111d8f074527eedf54731196c8b277e.js",
              document.body,
              true,
              false,
            )
              .then(() => {
                console.log("SocialBar script loaded successfully")

                // Mensaje informativo
                if (adContainerRef.current) {
                  const message = document.createElement("div")
                  message.className = "text-center p-4 bg-green-500/10 rounded-lg mt-4"
                  message.innerHTML = `
                    <p class="text-green-500 font-medium mb-2">SocialBar cargado correctamente</p>
                    <p class="text-gray-400 text-sm">Este anuncio puede aparecer en otra parte de la página</p>
                  `
                  adContainerRef.current.appendChild(message)
                }
              })
              .catch((error) => {
                console.error("Error loading SocialBar script:", error)

                // Mensaje de error
                if (adContainerRef.current) {
                  const errorMessage = document.createElement("div")
                  errorMessage.className = "text-center p-4 bg-red-500/10 rounded-lg mt-4"
                  errorMessage.innerHTML = `
                    <p class="text-red-500 font-medium mb-2">Error al cargar SocialBar</p>
                    <p class="text-gray-400 text-sm">Pero puedes continuar para recibir tu recompensa</p>
                  `
                  adContainerRef.current.appendChild(errorMessage)
                }
              })
          }, 500) // Pequeño retraso para asegurar que el DOM esté listo
        }
      } else if (currentAdIndex === 3) {
        // Popunder - Implementación con manejo de eventos
        if (adContainerRef.current) {
          // Crear un contenedor específico para el Popunder
          const container = document.createElement("div")
          container.id = "popunder-container"
          container.className = "popunder-container w-full h-full"
          adContainerRef.current.appendChild(container)

          // Asegurarse de que el DOM esté listo antes de cargar el script
          setTimeout(() => {
            // Cargar el script con manejo de eventos
            loadScript(
              "//pl26017933.effectiveratecpm.com/53/38/ce/5338ce573b1b344f161603013368e095.js",
              document.body,
              true,
              false,
            )
              .then(() => {
                console.log("Popunder script loaded successfully")

                // Mensaje informativo
                if (adContainerRef.current) {
                  const message = document.createElement("div")
                  message.className = "text-center p-4 bg-green-500/10 rounded-lg mt-4"
                  message.innerHTML = `
                    <p class="text-green-500 font-medium mb-2">Popunder cargado correctamente</p>
                    <p class="text-gray-400 text-sm">Este anuncio puede aparecer en otra ventana o pestaña</p>
                  `
                  adContainerRef.current.appendChild(message)
                }
              })
              .catch((error) => {
                console.error("Error loading Popunder script:", error)

                // Mensaje de error
                if (adContainerRef.current) {
                  const errorMessage = document.createElement("div")
                  errorMessage.className = "text-center p-4 bg-red-500/10 rounded-lg mt-4"
                  errorMessage.innerHTML = `
                    <p class="text-red-500 font-medium mb-2">Error al cargar Popunder</p>
                    <p class="text-gray-400 text-sm">Pero puedes continuar para recibir tu recompensa</p>
                  `
                  adContainerRef.current.appendChild(errorMessage)
                }
              })
          }, 500) // Pequeño retraso para asegurar que el DOM esté listo
        }
      }
    }

    return () => {
      // Ejecutar limpieza completa cuando el componente se desmonta o cambia
      cleanupAds()
    }
  }, [isOpen, currentAdIndex, cleanupAds, loadScript])

  // Timer countdown
  useEffect(() => {
    if (!isOpen || isCompleted || isPaused) return

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current !== null) {
            clearInterval(timerRef.current)
            timerRef.current = null
          }
          setIsCompleted(true)
          // Mover la llamada a onComplete fuera del renderizado
          setTimeout(() => onComplete(), 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isOpen, isCompleted, isPaused, onComplete])

  // Función para cerrar el modal y limpiar anuncios
  const handleClose = () => {
    cleanupAds()
    onClose()
  }

  const handleCloseAttempt = () => {
    if (!isCompleted) {
      setIsPaused(true) // Pausar el temporizador
      setShowConfirmation(true)
    } else {
      handleClose()
    }
  }

  const handleConfirmClose = () => {
    setShowConfirmation(false)
    handleClose()
  }

  const handleCancelClose = () => {
    setShowConfirmation(false)
    setIsPaused(false) // Reanudar el temporizador
  }

  const handleNextAdClick = () => {
    if (isCompleted && currentAdIndex < totalAds - 1) {
      setShowRewardMessage(true)

      // Mostrar mensaje por 1.5 segundos y luego pasar al siguiente anuncio
      setTimeout(() => {
        setShowRewardMessage(false)
        onNextAd()
      }, 1500)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-full max-w-4xl bg-gray-900 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="text-lg font-semibold">Anuncio</div>
            <div className="text-sm text-gray-400">
              {currentAdIndex + 1} de {totalAds}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm">
              <Clock size={16} />
              <span>{timeRemaining}s restantes</span>
            </div>
            <div className="text-sm text-gray-400">{remainingViews} anuncios restantes hoy</div>
            <button onClick={handleCloseAttempt} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Ad Content */}
        <div className="p-6 min-h-[400px] flex items-center justify-center">
          <div ref={adContainerRef} className="w-full h-full flex items-center justify-center">
            {/* El script insertará el contenido aquí */}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-800">
          <div className="w-32"></div> {/* Espacio vacío donde estaba el botón anterior */}
          <div className="text-center">
            {isCompleted ? (
              <div className="text-green-500 font-medium">¡Completado! +$0.30 ganados</div>
            ) : (
              <div className="text-gray-400">Espera {timeRemaining} segundos para recibir tu recompensa</div>
            )}
          </div>
          <button
            onClick={handleNextAdClick}
            disabled={currentAdIndex === totalAds - 1 || !isCompleted || showRewardMessage}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg w-32 justify-center ${
              currentAdIndex === totalAds - 1 || !isCompleted || showRewardMessage
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-green-500 text-black hover:bg-green-400"
            }`}
          >
            <span>Siguiente</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4 text-yellow-500">
              <AlertTriangle size={24} />
              <h3 className="text-xl font-semibold">¿Estás seguro?</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Si sales ahora, no recibirás la recompensa por este anuncio. Debes esperar {timeRemaining} segundos más
              para obtener tu pago.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelClose}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                Continuar viendo
              </button>
              <button
                onClick={handleConfirmClose}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Salir sin recompensa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reward Message Overlay */}
      {showRewardMessage && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80">
          <div className="bg-green-500 text-black font-bold text-xl p-8 rounded-xl animate-pulse">
            ¡Has ganado $0.30! Cargando siguiente anuncio...
          </div>
        </div>
      )}
    </div>
  )
}

