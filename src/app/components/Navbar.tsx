"use client"

import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { Menu, ChevronDown, User, LogOut } from "lucide-react"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown"
import { Button } from "@heroui/react"
import AuthModal from "./AuthModal"

export default function Navbar() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  const openLoginModal = () => {
    setIsLoginMode(true)
    setIsAuthModalOpen(true)
  }

  const openRegisterModal = () => {
    setIsLoginMode(false)
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "bg-black/90" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-8">
          <Link href="/" className="text-green-500 font-bold text-3xl">
            Rewarz
          </Link>
        </div>

        <nav className="hidden md:flex gap-8 text-lg items-center">
          <Link href="/" className="hover:text-green-400">
            Inicio
          </Link>
          <Dropdown>
            <DropdownTrigger className="flex items-center gap-1 hover:text-green-400">
              <Button radius="lg" className="flex items-center gap-1">
                Ganar Dinero <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu className="w-48 p-0 bg-green-600 border border-green-800 rounded-md shadow-lg text-white">
              <DropdownItem key="watch videos" className="p-0 w-full ">
                <Link href="/earn/videos" className="block w-48 px-4 py-2 hover:bg-green-800">
                  Ver Videos
                </Link>
              </DropdownItem>
              <DropdownItem key="click videos" className="p-0">
                <Link href="/earn/video-clicks" className="block w-48  px-4 py-2 hover:bg-green-800">
                  Click en Videos
                </Link>
              </DropdownItem>
              <DropdownItem key="encuestas" className="p-0">
                <Link href="/earn/surveys" className="block w-48  px-4 py-2 hover:bg-green-800">
                  Encuestas
                </Link>
              </DropdownItem>
              <DropdownItem key="games" className="p-0 w-full">
                <Link href="/earn/games" className="block w-48  px-4 py-2 hover:bg-green-800 ">
                  Juegos y Microtareas
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Link href="/how-to-withdraw" className="hover:text-green-400">
            Como Retirar
          </Link>
          <Link href="/contact" className="hover:text-green-400">
            Contacto
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          {status === "authenticated" ? (
            <Dropdown>
              <DropdownTrigger className="flex items-center gap-1 hover:text-green-400">
                <Button radius="lg" className="flex items-center gap-1">
                  <User className="w-4 h-4 mr-1" />
                  {session.user?.name || "Usuario"}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="w-48 p-0 bg-green-600 border border-green-800 rounded-md shadow-lg text-white">
                <DropdownItem key="profile" className="p-0 w-full">
                  <Link href="/profile" className="block w-48 px-4 py-2 hover:bg-green-800">
                    Mi Perfil
                  </Link>
                </DropdownItem>
                <DropdownItem key="dashboard" className="p-0 w-full">
                  <Link href="/dashboard" className="block w-48 px-4 py-2 hover:bg-green-800">
                    Dashboard
                  </Link>
                </DropdownItem>
                <DropdownItem key="logout" className="p-0 w-full">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-48 px-4 py-2 hover:bg-green-800 text-left"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                  </button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <>
              <button onClick={openLoginModal} className="hover:text-green-400">
                Login
              </button>
              <button onClick={openRegisterModal} className="bg-green-800 px-5 py-2 rounded-md hover:bg-green-600">
                Registro
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 bg-black/95 p-4 z-50">{/* Mobile menu content */}</div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} initialMode={isLoginMode ? "login" : "register"} />
    </>
  )
}

