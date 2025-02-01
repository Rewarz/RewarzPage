"use client"

import { useState, useEffect, useRef } from "react"
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
  const adContainerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const prevAdIndexRef = useRef(currentAdIndex)

  // Reset timer when ad changes or modal opens
  useEffect(() => {
    if (isOpen) {
      // Solo reiniciar si realmente cambió el índice del anuncio
      if (prevAdIndexRef.current !== currentAdIndex) {
        setTimeRemaining(15)
        setIsCompleted(false)
        setIsPaused(false)
        setShowRewardMessage(false)
        prevAdIndexRef.current = currentAdIndex
      } else if (prevAdIndexRef.current === 0 && currentAdIndex === 0) {
        // Primera apertura del modal
        setTimeRemaining(15)
        setIsCompleted(false)
        setIsPaused(false)
        setShowRewardMessage(false)
      }
    }
  }, [isOpen, currentAdIndex])

  // Initialize ad script when component mounts or ad changes
  useEffect(() => {
    if (isOpen && adContainerRef.current) {
      // Clear previous ad content
      adContainerRef.current.innerHTML = ""

      // Eliminar scripts anteriores
      const existingScripts = document.querySelectorAll(
        'script[src*="effectiveratecpm.com"], script[src*="highperformanceformat.com"]',
      )
      existingScripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      })

      // Alternar entre los dos scripts (par = script1, impar = script2)
      if (currentAdIndex % 2 === 0) {
        // Script original (para índices 0, 2)
        const container = document.createElement("div")
        container.id = "container-1168d2b369a0985d6c4dbfd089c4f397"
        adContainerRef.current.appendChild(container)
        const script = document.createElement("script")
        script.async = true
        script.setAttribute("data-cfasync", "false")
        script.src = "//pl26017745.effectiveratecpm.com/1168d2b369a0985d6c4dbfd089c4f397/invoke.js"
        document.head.appendChild(script)
      } else {
        // Script nuevo con iframe (para índices 1, 3)
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

        // Crear script de invocación
        const invokeScript = document.createElement("script")
        invokeScript.type = "text/javascript"
        invokeScript.src = "//www.highperformanceformat.com/8592fc2e6fcf3138efee1d71a81ac279/invoke.js"
        container.appendChild(invokeScript)
      }
    }



    return () => {
      // Cleanup scripts when component unmounts or changes
      const existingScripts = document.querySelectorAll(
        'script[src*="effectiveratecpm.com"], script[src*="highperformanceformat.com"]',
      )
      existingScripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      })
    }
  }, [isOpen, currentAdIndex])

  // Timer countdown
  useEffect(() => {
    if (!isOpen || isCompleted || isPaused) return

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          setIsCompleted(true)
          // Mover la llamada a onComplete fuera del renderizado
          setTimeout(() => onComplete(), 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isOpen, isCompleted, onComplete, isPaused])

  const handleCloseAttempt = () => {
    if (!isCompleted) {
      setIsPaused(true) // Pausar el temporizador
      setShowConfirmation(true)
    } else {
      onClose()
    }
  }

  const handleConfirmClose = () => {
    setShowConfirmation(false)
    onClose()
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

