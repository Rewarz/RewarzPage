"use client"

import { useState, useEffect, useRef } from "react"
import { X, ChevronRight, Clock, AlertTriangle } from "lucide-react"

// Replace 'any' with a specific interface to fix the ESLint error
declare global {
  interface Window {
    atOptions:
      | {
          key: string
          format: string
          height: number
          width: number
          params: Record<string, unknown>
        }
      | undefined
  }
}

interface AdViewerModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  currentAdIndex: number
  totalAds: number
  onNextAd: () => void
  remainingViews: number
  platformId?: number // Add this line
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
  const [isAdLoaded, setIsAdLoaded] = useState(false)

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
        setIsAdLoaded(false)
        prevAdIndexRef.current = currentAdIndex
      } else if (prevAdIndexRef.current === 0 && currentAdIndex === 0) {
        // Primera apertura del modal
        setTimeRemaining(15)
        setIsCompleted(false)
        setIsPaused(false)
        setShowRewardMessage(false)
        setIsAdLoaded(false)
      }
    }
  }, [isOpen, currentAdIndex])

  // Función para limpiar scripts y elementos relacionados con anuncios
  const cleanupAds = () => {
    // Eliminate all scripts from ad networks
    const adScriptSelectors = [
      'script[src*="effectiveratecpm.com"]',
      'script[src*="highperformanceformat.com"]',
      'script[src*="adsterra"]',
      'script[data-cfasync="false"]',
    ]

    adScriptSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((script) => {
        if (script.parentNode) {
          // Type cast to HTMLScriptElement to access src property
          console.log("Removing script:", (script as HTMLScriptElement).src)
          script.parentNode.removeChild(script)
        }
      })
    })

    // Remove all iframes created by ads
    const adIframeSelectors = [
      'iframe[src*="effectiveratecpm"]',
      'iframe[src*="highperformanceformat"]',
      'iframe[id*="google_ads"]',
      'iframe[id*="ad-"]',
    ]

    adIframeSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((iframe) => {
        if (iframe.parentNode) {
          // Type cast to HTMLIFrameElement to access id and src properties
          const iframeElement = iframe as HTMLIFrameElement
          console.log("Removing iframe:", iframeElement.id || iframeElement.src)
          iframe.parentNode.removeChild(iframe)
        }
      })
    })

    // Remove specific ad containers
    const adContainerIds = ["container-1168d2b369a0985d6c4dbfd089c4f397", "socialbar-container", "popunder-container"]

    adContainerIds.forEach((id) => {
      const container = document.getElementById(id)
      if (container && container.parentNode) {
        console.log("Removing container:", id)
        container.parentNode.removeChild(container)
      }
    })

    // Clean up any other ad-related elements
    const adElementSelectors = [
      '[id*="ScriptRoot"]',
      '[id*="ad-container"]',
      '[class*="ad-container"]',
      '[id*="adsterra"]',
      '[class*="adsterra"]',
      '[id*="popunder"]',
      '[class*="popunder"]',
    ]

    adElementSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        if (el.parentNode) {
          // Type cast to HTMLElement to access id and className properties
          const element = el as HTMLElement
          console.log("Removing element:", element.id || element.className)
          el.parentNode.removeChild(el)
        }
      })
    })

    // Find and remove the specific SocialBar wrapper that's persisting
    const socialBarWrappers = document.querySelectorAll('[class*="pl-5111d8f074527eedf54731196c8b277e__wrap"]')
    socialBarWrappers.forEach((wrapper) => {
      if (wrapper.parentNode) {
        console.log("Removing persistent SocialBar wrapper")
        wrapper.parentNode.removeChild(wrapper)
      }
    })

    // Also check for any elements with pl- prefix classes which might be ad related
    const plPrefixElements = document.querySelectorAll('[class^="pl-"]')
    plPrefixElements.forEach((el) => {
      if (el.parentNode) {
        console.log("Removing pl-prefixed element:", (el as HTMLElement).className)
        el.parentNode.removeChild(el)
      }
    })

    // Clear any global variables or functions that might have been set by ads
    if (window.atOptions) {
      window.atOptions = undefined
    }

    // Remove the script saved in the reference
    if (scriptRef.current && scriptRef.current.parentNode) {
      console.log("Removing script reference")
      scriptRef.current.parentNode.removeChild(scriptRef.current)
      scriptRef.current = null
    }

    // Force garbage collection hint
    if (adContainerRef.current) {
      adContainerRef.current.innerHTML = ""
    }
  }

  // Función para cargar un script con manejo de eventos
  const loadScript = (
    src: string,
    container: HTMLElement | Document = document.body,
    async = true,
    defer = true,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = src
      script.async = async
      script.defer = defer

      script.onload = () => {
        console.log(`Script loaded successfully: ${src}`)
        setIsAdLoaded(true)
        resolve()
      }

      script.onerror = (error) => {
        console.error(`Error loading script: ${src}`, error)
        reject(error)
      }

      container.appendChild(script)
      scriptRef.current = script
    })
  }

  // Initialize ad script when component mounts or ad changes
  useEffect(() => {
    if (isOpen) {
      // Limpiar antes de agregar nuevos anuncios
      cleanupAds()

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
        // SocialBar - Implementación mejorada
        if (adContainerRef.current) {
          // Limpiar el contenedor
          adContainerRef.current.innerHTML = ""

          // Crear un contenedor específico para el SocialBar con tamaño adecuado
          const container = document.createElement("div")
          container.id = "socialbar-container"
          container.className = "w-full min-h-[250px] flex flex-col items-center justify-center"
          adContainerRef.current.appendChild(container)

          // Agregar un mensaje informativo visible
          const infoMessage = document.createElement("div")
          infoMessage.className = "text-center p-4 bg-green-500/10 rounded-lg mb-4 w-full"
          infoMessage.innerHTML = `
            <p class="text-green-500 font-medium mb-2">Cargando SocialBar...</p>
            <p class="text-gray-400 text-sm">Este anuncio aparecerá en la parte inferior de la página</p>
          `
          container.appendChild(infoMessage)

          // Crear un contenedor visible para el anuncio
          const adPlaceholder = document.createElement("div")
          adPlaceholder.className = "border-2 border-dashed border-green-500/30 rounded-lg p-8 text-center w-full"
          adPlaceholder.innerHTML = `
            <div class="animate-pulse">
              <div class="h-4 bg-green-500/20 rounded w-3/4 mx-auto mb-4"></div>
              <div class="h-4 bg-green-500/20 rounded w-1/2 mx-auto"></div>
            </div>
          `
          container.appendChild(adPlaceholder)

          // Cargar el script con manejo de eventos
          setTimeout(() => {
            loadScript(
              "//pl26018299.effectiveratecpm.com/51/11/d8/5111d8f074527eedf54731196c8b277e.js",
              document.head,
              true,
              false,
            )
              .then(() => {
                console.log("SocialBar script loaded successfully")
                // Actualizar el mensaje
                infoMessage.innerHTML = `
                  <p class="text-green-500 font-medium mb-2">SocialBar cargado correctamente</p>
                  <p class="text-gray-400 text-sm">Verifica la parte inferior de la página</p>
                `

                // Agregar un elemento visual para simular el anuncio
                adPlaceholder.innerHTML = `
                  <div class="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-green-500 mb-2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <p class="text-green-500 font-medium">Anuncio cargado correctamente</p>
                `
              })
              .catch((error) => {
                console.error("Error loading SocialBar script:", error)
                infoMessage.innerHTML = `
                  <p class="text-red-500 font-medium mb-2">Error al cargar SocialBar</p>
                  <p class="text-gray-400 text-sm">Pero puedes continuar para recibir tu recompensa</p>
                `
              })
          }, 500)
        }
      } else if (currentAdIndex === 3) {
        // Popunder - Implementación mejorada
        if (adContainerRef.current) {
          // Limpiar el contenedor
          adContainerRef.current.innerHTML = ""

          // Crear un contenedor específico para el Popunder con tamaño adecuado
          const container = document.createElement("div")
          container.id = "popunder-container"
          container.className = "w-full min-h-[250px] flex flex-col items-center justify-center"
          adContainerRef.current.appendChild(container)

          // Agregar un mensaje informativo visible
          const infoMessage = document.createElement("div")
          infoMessage.className = "text-center p-4 bg-green-500/10 rounded-lg mb-4 w-full"
          infoMessage.innerHTML = `
            <p class="text-green-500 font-medium mb-2">Cargando Popunder...</p>
            <p class="text-gray-400 text-sm">Este anuncio puede aparecer en otra ventana o pestaña</p>
          `
          container.appendChild(infoMessage)

          // Crear un contenedor visible para el anuncio
          const adPlaceholder = document.createElement("div")
          adPlaceholder.className = "border-2 border-dashed border-green-500/30 rounded-lg p-8 text-center w-full"
          adPlaceholder.innerHTML = `
            <div class="animate-pulse">
              <div class="h-4 bg-green-500/20 rounded w-3/4 mx-auto mb-4"></div>
              <div class="h-4 bg-green-500/20 rounded w-1/2 mx-auto"></div>
            </div>
          `
          container.appendChild(adPlaceholder)

          // Cargar el script con manejo de eventos
          setTimeout(() => {
            loadScript(
              "//pl26017933.effectiveratecpm.com/53/38/ce/5338ce573b1b344f161603013368e095.js",
              document.head,
              true,
              false,
            )
              .then(() => {
                console.log("Popunder script loaded successfully")
                // Actualizar el mensaje
                infoMessage.innerHTML = `
                  <p class="text-green-500 font-medium mb-2">Popunder cargado correctamente</p>
                  <p class="text-gray-400 text-sm">Verifica si se ha abierto una nueva ventana o pestaña</p>
                `
                // Agregar un elemento visual para simular el anuncio
                adPlaceholder.innerHTML = `
                  <div class="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-green-500 mb-2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <p class="text-green-500 font-medium">Anuncio cargado correctamente</p>
                `
              })
              .catch((error) => {
                console.error("Error loading Popunder script:", error)
                infoMessage.innerHTML = `
                  <p class="text-red-500 font-medium mb-2">Error al cargar Popunder</p>
                  <p class="text-gray-400 text-sm">Pero puedes continuar para recibir tu recompensa</p>
                `
              })
          }, 500)
        }
      }
    }

    return () => {
      // Ejecutar limpieza completa cuando el componente se desmonta o cambia
      cleanupAds()
    }
  }, [isOpen, currentAdIndex])

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

      // Run cleanup before showing the reward message
      cleanupAds()

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
            {!isAdLoaded && (currentAdIndex === 2 || currentAdIndex === 3) && (
              <div className="animate-pulse text-center">
                <p className="text-gray-400">Cargando anuncio...</p>
              </div>
            )}
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

