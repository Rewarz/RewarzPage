import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#05050560] border-t border-gray-800">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">
                Únete a nuestra comunidad
              </h3>
              <p className="text-gray-400">
                Recibe las últimas novedades y ofertas especiales
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Link
                href="/auth/register"
                className="text-sm bg-green-600 px-4 py-2 rounded-md hover:bg-green-800"
              >
                Registro
              </Link>
              
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Link
              href="/"
              className="text-green-500 font-bold text-3xl mb-6 block"
            >
              Rewarz
            </Link>
            <p className="text-gray-400 mb-6">
              La plataforma líder en recompensas por ver videos, jugar y
              completar encuestas.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-black transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-black transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-black transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-black transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Ganar Dinero</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/earn/videos"
                  className="text-gray-400 hover:text-green-500 flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  Ver Videos
                </Link>
              </li>
              <li>
                <Link
                  href="/earn/video-clicks"
                  className="text-gray-400 hover:text-green-500 flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  Click en Videos
                </Link>
              </li>
              <li>
                <Link
                  href="/earn/surveys"
                  className="text-gray-400 hover:text-green-500 flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  Encuestas
                </Link>
              </li>
              <li>
                <Link
                  href="/earn/games"
                  className="text-gray-400 hover:text-green-500 flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  Juegos y Microtareas
                </Link>
              </li>
              <li>
                <Link
                  href="/withdraw"
                  className="text-gray-400 hover:text-green-500 flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  Retirar Dinero
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Compañía</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-green-500 flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-green-500 flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-400 hover:text-green-500 flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  Trabaja con Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliate"
                  className="text-gray-400 hover:text-green-500 flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  Programa de Afiliados
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-gray-400 hover:text-green-500 flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  Prensa
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <Mail className="w-5 h-5 mt-1 text-green-500" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:soporte@rewarz.com"
                    className="hover:text-green-500"
                  >
                    soporte@rewarz.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Phone className="w-5 h-5 mt-1 text-green-500" />
                <div>
                  <p className="font-medium">Teléfono</p>
                  <a href="tel:+1234567890" className="hover:text-green-500">
                    +1 (234) 567-890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-1 text-green-500" />
                <div>
                  <p className="font-medium">Dirección</p>
                  <p>
                    123 Calle Principal,
                    <br />
                    Ciudad, País 12345
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 Rewarz. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-green-500"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-green-500"
              >
                Términos y Condiciones
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-400 hover:text-green-500"
              >
                Política de Cookies
              </Link>
              <Link
                href="/legal"
                className="text-sm text-gray-400 hover:text-green-500"
              >
                Aviso Legal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
