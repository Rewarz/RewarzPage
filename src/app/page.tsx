"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Play,
  MousePointer,
  ClipboardCheck,
  Gamepad2,
  Info,
  Megaphone,
  Wallet,
  HelpCircle,
  Mail,
  MessageCircle,
  Clock,
} from "lucide-react";
import { useEffect, useRef } from "react";

export default function Home() {
  const wordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const words = ["REWARDS", "PLAYING", "VIDEOS", "SURVEYS", "GAMES", "MONEY"];
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (wordsRef.current) {
        wordsRef.current.innerText = words[currentIndex];
        currentIndex = (currentIndex + 1) % words.length;
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="mx-auto px-4 py-16 md:py-24 relative text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent opacity-30 pointer-events-none" />

        {/* Main Hero Content */}
        <div className=" mx-auto mb-16 flex flex-col items-center mt-26">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">Gana <span className="text-green-400">$</span> Recompensas</h1>
          <p className="text-xl md:text-2xl text-gray-300 mt-6 max-w-3xl leading-relaxed">
            Jugando, contestando encuestas, viendo videos y mucho más
          </p>
          
        </div>

        {/* Green Light Effect - Extended to top */}
        <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
          <div className="absolute left-1/2 -translate-x-1/2 w-60 h-[150vh] -top-[50vh] bg-green-500/30 blur-3xl rounded-full z-0"></div>
        </div>

        {/* Laptop Image - Reduced Size */}
        <div className="relative max-w-2xl mx-auto mt-26 mb-16">
          <Image
            src="/mockupInicio.png"
            alt="Laptop Mockup"
            width={500}
            height={300}
            className="w-full h-auto relative z-10"
          />
        </div>

        {/* Scrolling Words Section */}
        <div className="relative overflow-hidden py-20 mt-8 space-y-16">
          {/* Primera línea - Hacia la izquierda */}
          <div className="relative overflow-hidden">
            <div className="flex whitespace-nowrap animate-scroll-left">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-8 items-center">
                  <span className="text-6xl md:text-8xl font-bold text-green-500 mx-8">
                    REWARDS
                  </span>
                  <span className="text-6xl md:text-8xl font-bold text-green-900/50 mx-8">
                    PLAYING
                  </span>
                  <span className="text-6xl md:text-8xl font-bold text-green-500 mx-8">
                    VIDEOS
                  </span>
                  <span className="text-6xl md:text-8xl font-bold text-green-900/50 mx-8">
                    SURVEYS
                  </span>
                  <span className="text-6xl md:text-8xl font-bold text-green-500 mx-8">
                    GAMES
                  </span>
                  <span className="text-6xl md:text-8xl font-bold text-green-900/50 mx-8">
                    MONEY
                  </span>
                  <span className="text-6xl md:text-8xl font-bold text-green-500 mx-8">
                    WIN
                  </span>
                  <span className="text-6xl md:text-8xl font-bold text-green-900/50 mx-8">
                    EARN
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Segunda línea - Hacia la derecha */}
          <div className="relative overflow-hidden">
            <div className="flex whitespace-nowrap animate-scroll-right">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-8 items-center">
                  <span className="text-6xl md:text-8xl font-bold text-green-900/50 mx-8">
                    ACHIEVE
                  </span>
                  <span className="text-6xl md:text-8xl font-bold text-green-500 mx-8">
                    SUCCESS
                  </span>
                  <span className="text-6xl md:text-8xl font-bold text-green-900/50 mx-8">
                    PROFIT
                  </span>
                  <span className="text-6xl md:text-8xl font-bold text-green-500 mx-8">
                    COMPETE
                  </span>
                  <span className="text-6xl md:text-8xl font-bold text-green-900/50 mx-8">
                    LEVEL UP
                  </span>
                  <span className="text-6xl md:text-8xl font-bold text-green-500 mx-8">
                    GROW
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tercera línea - Hacia la izquierda */}
          <div className="relative overflow-hidden">
            <div className="flex whitespace-nowrap animate-scroll-left">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-8 items-center">
                  <span className="text-6xl md:text-8xl font-bold text-green-500 mx-8">
                    CHALLENGE
                  </span>
                  <span className="text-6xl md:text-8xl font-bold text-green-900/50 mx-8">
                    EXPLORE
                  </span>
                  <span className="text-6xl md:text-8xl font-bold text-green-500 mx-8">
                    DISCOVER
                  </span>
                  <span className="text-6xl md:text-8xl font-bold text-green-900/50 mx-8">
                    ADVANCE
                  </span>
                  <span className="text-6xl md:text-8xl font-bold text-green-500 mx-8">
                    UNLOCK
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cuarta línea - Hacia la derecha */}
          <div className="relative overflow-hidden">
            <div className="flex whitespace-nowrap animate-scroll-right">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-8 items-center">
                  <span className="text-6xl md:text-8xl font-bold text-green-900/50 mx-8">
                    PROGRESS
                  </span>
                  <span className="text-6xl md:text-8xl font-bold text-green-500 mx-8">
                    ACHIEVE
                  </span>
                  <span className="text-6xl md:text-8xl font-bold text-green-900/50 mx-8">
                    VICTORY
                  </span>
                  <span className="text-6xl md:text-8xl font-bold text-green-500 mx-8">
                    TRIUMPH
                  </span>
                  <span className="text-6xl md:text-8xl font-bold text-green-900/50 mx-8">
                    CONQUER
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Earn Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">¿Cómo empezar a ganar?</h2>
            <p className="text-gray-400 mb-6">
              Sigue estos sencillos pasos para comenzar a ganar recompensas con
              Rewarz
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <div className="font-medium text-lg">Crea tu cuenta</div>
                  <div className="text-gray-400">
                    Regístrate en menos de un minuto con tu correo electrónico o
                    redes sociales
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <div className="font-medium text-lg">
                    Elige tus actividades
                  </div>
                  <div className="text-gray-400">
                    Selecciona entre ver videos, jugar, completar encuestas o
                    realizar microtareas
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <div className="font-medium text-lg">
                    Completa las actividades
                  </div>
                  <div className="text-gray-400">
                    Acumula puntos por cada actividad completada. ¡Entre más
                    participes, más ganas!
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                  <span className="font-bold">4</span>
                </div>
                <div>
                  <div className="font-medium text-lg">
                    Retira tus ganancias
                  </div>
                  <div className="text-gray-400">
                    Transfiere tus recompensas a tu cuenta bancaria o canjea por
                    premios
                  </div>
                </div>
              </li>
            </ul>
            <button className="mt-8 bg-green-500 hover:bg-green-600 text-black font-medium px-6 py-2 rounded-md">
              Comenzar Ahora
            </button>
          </div>
          <div className="md:w-1/2 border border-green-500/30 rounded-xl overflow-hidden">
            <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent"></div>
              <div className="relative w-48 h-48">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Earning Steps"
                  width={200}
                  height={200}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Earning Methods Section */}
      <section className="relative z-10 mx-auto px-4 py-24 ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Gana dinero <span className="text-green-500">fácilmente</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 text-lg">
            Múltiples formas de ganar recompensas, elige la que más te guste
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ver Videos Card */}
            <div className="bg-gray-900/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-800/50">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                  <Play className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Ver Videos</h3>
                  <p className="text-gray-400">
                    Mira videos cortos y gana recompensas instantáneas.
                    Contenido nuevo disponible cada día.
                  </p>
                  <div className="bg-green-500/10 text-green-500 text-sm px-3 py-1 rounded-full inline-block">
                    +$0.50 por video
                  </div>
                </div>
              </div>
            </div>

            {/* Click en Videos Card */}
            <div className="bg-gray-900/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-800/50">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                  <MousePointer className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Click en Videos</h3>
                  <p className="text-gray-400">
                    Interactúa con videos promocionales y gana por cada
                    interacción válida completada.
                  </p>
                  <div className="bg-green-500/10 text-green-500 text-sm px-3 py-1 rounded-full inline-block">
                    +$0.25 por click
                  </div>
                </div>
              </div>
            </div>

            {/* Encuestas Card */}
            <div className="bg-gray-900/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-800/50">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                  <ClipboardCheck className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Encuestas</h3>
                  <p className="text-gray-400">
                    Completa encuestas breves y comparte tu opinión. Mayor
                    recompensa por encuestas más largas.
                  </p>
                  <div className="bg-green-500/10 text-green-500 text-sm px-3 py-1 rounded-full inline-block">
                    +$1.00 por encuesta
                  </div>
                </div>
              </div>
            </div>

            {/* Juegos Card */}
            <div className="bg-gray-900/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-800/50">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">
                    Juegos y Microtareas
                  </h3>
                  <p className="text-gray-400">
                    Juega y completa pequeñas tareas. Gana mientras te diviertes
                    con juegos casuales y misiones.
                  </p>
                  <div className="bg-green-500/10 text-green-500 text-sm px-3 py-1 rounded-full inline-block">
                    +$2.00 por hora
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full">
              <Info className="w-5 h-5" />
              <span className="text-sm">
                Las recompensas pueden variar según la región y disponibilidad
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Support Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="text-sm text-green-500 mb-2">
              SOPORTE Y CONTACTO
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Necesitas ayuda o quieres
              <br />
              colaborar con nosotros?
            </h2>
            <p className="text-gray-400 mb-6">
              Ya sea que necesites asistencia, quieras promocionar tu marca o
              implementar un programa de cashback, estamos aquí para ayudarte.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium">Promociona tu marca</div>
                  <div className="text-sm text-gray-400">
                    Alcanza a nuestra comunidad de usuarios activos
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium">Programa de Cashback</div>
                  <div className="text-sm text-gray-400">
                    Implementa recompensas para tus clientes
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium">Centro de Ayuda</div>
                  <div className="text-sm text-gray-400">
                    Resuelve tus dudas con nuestro equipo de soporte
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <Link
                href="/contact"
                className="bg-green-500 hover:bg-green-600 text-black font-medium px-6 py-2 rounded-md"
              >
                Contactar
              </Link>
              <Link
                href="/help"
                className="border border-green-500/50 hover:bg-green-500/10 text-green-500 font-medium px-6 py-2 rounded-md"
              >
                Centro de Ayuda
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full"></div>
            <div className="relative bg-gray-900/50 border border-gray-800/50 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">Contáctanos</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-5 h-5 text-green-500" />
                  <span>soporte@rewarz.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  <span>Chat en vivo disponible 24/7</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span>Respuesta en menos de 24 horas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
