"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Gamepad2, Trophy, Clock, Star, ChevronDown, DollarSign, Timer, Target } from "lucide-react"

// Tipos de datos
type GameCategory = "Todos" | "Casual" | "Acción" | "Estrategia" | "Deportes" | "Aventura"
type Difficulty = "Todos" | "Fácil" | "Medio" | "Difícil"
type RewardRange = "Todos" | "0-5" | "5-10" | "10+"

interface Mission {
  id: number
  title: string
  reward: number
  difficulty: Difficulty
  timeEstimate: string
  completed: number
  total: number
}

interface Game {
  id: number
  title: string
  image: string
  category: GameCategory
  description: string
  missions: Mission[]
  rating: number
  players: number
}

// Datos de ejemplo
const games: Game[] = [
  {
    id: 1,
    title: "Candy Crush Saga",
    image: "/placeholder.svg?height=200&width=200",
    category: "Casual",
    description: "Completa niveles y misiones especiales para ganar recompensas.",
    missions: [
      {
        id: 1,
        title: "Alcanza el nivel 50",
        reward: 5.0,
        difficulty: "Fácil",
        timeEstimate: "2 horas",
        completed: 0,
        total: 50,
      },
      {
        id: 2,
        title: "Consigue 3 estrellas en 20 niveles",
        reward: 10.0,
        difficulty: "Medio",
        timeEstimate: "4 horas",
        completed: 0,
        total: 20,
      },
    ],
    rating: 4.5,
    players: 1500,
  },
  {
    id: 2,
    title: "Call of Glory",
    image: "/placeholder.svg?height=200&width=200",
    category: "Acción",
    description: "Compite en batallas multijugador y completa misiones diarias.",
    missions: [
      {
        id: 3,
        title: "Gana 10 partidas",
        reward: 15.0,
        difficulty: "Difícil",
        timeEstimate: "5 horas",
        completed: 0,
        total: 10,
      },
    ],
    rating: 4.8,
    players: 2300,
  },
  {
    id: 3,
    title: "Farm Village",
    image: "/placeholder.svg?height=200&width=200",
    category: "Estrategia",
    description: "Construye tu granja y completa misiones de temporada.",
    missions: [
      {
        id: 4,
        title: "Alcanza nivel 20 de granja",
        reward: 8.0,
        difficulty: "Medio",
        timeEstimate: "3 horas",
        completed: 0,
        total: 20,
      },
    ],
    rating: 4.2,
    players: 800,
  },
  // Agrega más juegos aquí
]

export default function GamesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>("Todos")
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("Todos")
  const [selectedReward, setSelectedReward] = useState<RewardRange>("Todos")
  const [expandedGame, setExpandedGame] = useState<number | null>(null)

  // Filtrar juegos
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || game.category === selectedCategory
    const matchesDifficulty =
      selectedDifficulty === "Todos" || game.missions.some((mission) => mission.difficulty === selectedDifficulty)
    const matchesReward =
      selectedReward === "Todos" ||
      game.missions.some((mission) => {
        if (selectedReward === "0-5") return mission.reward <= 5
        if (selectedReward === "5-10") return mission.reward > 5 && mission.reward <= 10
        return mission.reward > 10
      })

    return matchesSearch && matchesCategory && matchesDifficulty && matchesReward
  })

  return (
    <div className=" text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-60 ">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent opacity-30" />

        {/* Green Light Effect */}
        <div className="absolute top-60 left-1/2 -translate-x-1/2 w-[500px] h-[500px]">
          <div className="absolute inset-0 bg-green-500/20 blur-[100px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Juega y gana <span className="text-green-500">recompensas</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Completa misiones en tus juegos favoritos y gana dinero mientras te diviertes
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full">
                <Gamepad2 size={20} />
                <span>Juegos Verificados</span>
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full">
                <Trophy size={20} />
                <span>Misiones Diarias</span>
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full">
                <Clock size={20} />
                <span>Recompensas Instantáneas</span>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar juegos..."
                    className="w-full bg-black/30 border border-gray-800 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-green-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <select
                    className="bg-black/30 border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as GameCategory)}
                  >
                    <option value="Todos">Categoría</option>
                    <option value="Casual">Casual</option>
                    <option value="Acción">Acción</option>
                    <option value="Estrategia">Estrategia</option>
                    <option value="Deportes">Deportes</option>
                    <option value="Aventura">Aventura</option>
                  </select>
                  <select
                    className="bg-black/30 border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty)}
                  >
                    <option value="Todos">Dificultad</option>
                    <option value="Fácil">Fácil</option>
                    <option value="Medio">Medio</option>
                    <option value="Difícil">Difícil</option>
                  </select>
                  <select
                    className="bg-black/30 border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
                    value={selectedReward}
                    onChange={(e) => setSelectedReward(e.target.value as RewardRange)}
                  >
                    <option value="Todos">Recompensa</option>
                    <option value="0-5">$0 - $5</option>
                    <option value="5-10">$5 - $10</option>
                    <option value="10+">$10+</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-6">
              {filteredGames.map((game) => (
                <div
                  key={game.id}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-colors"
                >
                  <div className="flex gap-6">
                    <Image
                      src={game.image || "/placeholder.svg"}
                      alt={game.title}
                      width={120}
                      height={120}
                      className="rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{game.title}</h3>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-400">{game.category}</span>
                            <div className="flex items-center gap-1">
                              <Star size={16} className="text-yellow-500 fill-yellow-500" />
                              <span className="text-sm">{game.rating}</span>
                            </div>
                            <span className="text-sm text-gray-400">{game.players} jugadores</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedGame(expandedGame === game.id ? null : game.id)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <ChevronDown
                            size={24}
                            className={`transform transition-transform ${expandedGame === game.id ? "rotate-180" : ""}`}
                          />
                        </button>
                      </div>
                      <p className="text-gray-400 mb-4">{game.description}</p>
                      <div className="flex flex-wrap gap-3">
                        {game.missions.slice(0, expandedGame === game.id ? undefined : 1).map((mission) => (
                          <div
                            key={mission.id}
                            className="flex-1 min-w-[250px] bg-black/30 rounded-lg p-4 border border-gray-800"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="font-medium mb-1">{mission.title}</h4>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                  <div className="flex items-center gap-1">
                                    <Timer size={14} />
                                    <span>{mission.timeEstimate}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Target size={14} />
                                    <span>{mission.difficulty}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-green-500 font-semibold">${mission.reward.toFixed(2)}</div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Progreso</span>
                                <span>
                                  {mission.completed}/{mission.total}
                                </span>
                              </div>
                              <div className="h-2 bg-black rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-green-500 rounded-full"
                                  style={{ width: `${(mission.completed / mission.total) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {expandedGame === game.id && (
                        <button className="mt-4 w-full bg-green-500 text-black font-medium px-6 py-3 rounded-lg hover:bg-green-400 transition-colors">
                          Comenzar a Jugar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Cómo Funciona</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                  <Gamepad2 size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Elige tu Juego</h3>
                <p className="text-gray-400">
                  Selecciona entre nuestra variedad de juegos verificados y comienza a jugar
                </p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                  <Trophy size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Completa Misiones</h3>
                <p className="text-gray-400">Cumple los objetivos de cada misión para ganar recompensas</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                  <DollarSign size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Recibe Recompensas</h3>
                <p className="text-gray-400">Gana dinero instantáneamente al completar las misiones</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-t from-green-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para jugar y ganar?</h2>
            <p className="text-xl text-gray-300 mb-8">Únete a miles de jugadores que ya están ganando recompensas</p>
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

