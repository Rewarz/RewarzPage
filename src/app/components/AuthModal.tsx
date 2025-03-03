"use client";
import { useState, useEffect } from "react";
import type React from "react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogIn, UserPlus, Mail, Lock, ArrowRight, X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: "login" | "register";
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode,
}: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsLogin(initialMode === "login");
  }, [initialMode]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
    setVerificationStep(false);
    setVerificationCode("");
  };

  const handleSendVerificationCode = async () => {
    try {
      const response = await fetch("/api/auth/email-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, isLogin }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Failed to send verification code");
        return false;
      }

      return true;
    } catch (error) {
      setError("An unexpected error occurred"+ error);
      return false;
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Invalid verification code");
        return false;
      }

      // If verification successful, proceed with login
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Authentication failed after verification"+error);
        return false;
      }

      onClose();
      resetForm();
      if (!isLogin) {
        router.push("/");
      }
      return true;
    } catch (error) {
      setError("An unexpected error occurred"+ error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (verificationStep) {
      await handleVerifyCode();
      return;
    }

    if (isLogin) {
      // Login logic - first step
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.requiresVerification) {
            const codeSent = await handleSendVerificationCode();
            if (codeSent) {
              setVerificationStep(true);
            }
          }
        } else {
          const data = await response.json();
          setError(data.message || "Invalid email or password");
        }
      } catch (error) {
        setError("An unexpected error occurred"+ error);
      }
    } else {
      // Sign up logic - first step
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.requiresVerification) {
            const codeSent = await handleSendVerificationCode();
            if (codeSent) {
              setVerificationStep(true);
            }
          }
        } else {
          const data = await response.json();
          setError(data.message || "Sign up failed");
        }
      } catch (error) {
        setError("An unexpected error occurred"+ error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/75 backdrop-blur-sm">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">
            {verificationStep
              ? "Verificación"
              : isLogin
              ? "Iniciar sesión"
              : "Crear cuenta"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {verificationStep ? (
          <div className="mb-6 text-gray-300 text-sm">
            <p>
              Hemos enviado un código de verificación a tu correo electrónico.
              Por favor, ingrésalo a continuación para continuar.
            </p>
          </div>
        ) : null}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {verificationStep ? (
            <div>
              <label
                htmlFor="verification-code"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Código de verificación
              </label>
              <input
                id="verification-code"
                name="verification-code"
                type="text"
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ingresa el código de 6 dígitos"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
              />
            </div>
          ) : (
            <>
              {!isLogin && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Nombre
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Correo electrónico
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
            </>
          )}

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {verificationStep ? (
                <>
                  Verificar
                  <ArrowRight className="ml-2 -mr-1 w-4 h-4" />
                </>
              ) : isLogin ? (
                <>
                  Iniciar sesión
                  <LogIn className="ml-2 -mr-1 w-4 h-4" />
                </>
              ) : (
                <>
                  Crear cuenta
                  <UserPlus className="ml-2 -mr-1 w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {!verificationStep && (
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-sm font-medium text-green-500 hover:text-green-400"
            >
              {isLogin
                ? "¿No tienes una cuenta? Regístrate"
                : "¿Ya tienes una cuenta? Inicia sesión"}
            </button>
          </div>
        )}

        {verificationStep && (
          <div className="mt-6 text-center">
            <button
              onClick={async () => {
                const codeSent = await handleSendVerificationCode();
                if (codeSent) {
                  setError("");
                  setVerificationCode("");
                }
              }}
              className="text-sm font-medium text-green-500 hover:text-green-400"
            >
              ¿No recibiste el código? Enviar de nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
