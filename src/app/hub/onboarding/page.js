/*"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import LoginForm from "@/components/Authentication/LoginForm";
import RegisterForm from "@/components/Authentication/RegisterForm";
import ValidationForm from "@/components/Authentication/ValidationForm";

const Onboarding = () => {
  const [step, setStep] = useState("start"); // "start" | "register" | "validate" | "login"
  const router = useRouter();

  // Opcional: estado para pasar datos entre formularios (ejemplo token, email)
  const [userData, setUserData] = useState(null);

  const handleRegisterSuccess = (data) => {
    setUserData(data);
    setStep("validate");
  };

  const handleValidationSuccess = () => {
    setStep("login");
  };

  const handleLoginSuccess = () => {
    router.push("/"); // Redirige a home o dashboard
  };

  return (
    <main className="container mx-auto p-6 max-w-md">
      {step === "start" && (
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-center">Bienvenido</h1>
          <button
            onClick={() => setStep("register")}
            className="bg-blue-600 text-white p-3 rounded"
          >
            Registrarse
          </button>
          <button
            onClick={() => setStep("login")}
            className="bg-green-600 text-white p-3 rounded"
          >
            Iniciar Sesión
          </button>
        </div>
      )}

      {step === "register" && (
        <RegisterForm
          onSuccess={handleRegisterSuccess}
          onCancel={() => setStep("start")}
        />
      )}

      {step === "validate" && (
        <ValidationForm
          onSuccess={handleValidationSuccess}
          token={userData?.token}
          onCancel={() => setStep("start")}
        />
      )}

      {step === "login" && (
        <LoginForm
          onSuccess={handleLoginSuccess}
          onCancel={() => setStep("start")}
        />
      )}
    </main>
  );
};

export default Onboarding;
*/