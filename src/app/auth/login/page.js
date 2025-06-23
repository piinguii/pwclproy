"use client";

import LoginForm from "@/components/Authentication/LoginForm";
import { useRouter } from "next/navigation";
import LocalStorage from "@/utils/localStorage";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = LocalStorage.getToken();
    if (token) {
      router.push("/hub");
    }
  }, [router]); // Solo corre una vez al montar la página

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-light text-gray-800 tracking-tight mb-2">
          Bildy 
        </h1>
        <p className="text-gray-500">Inicia sesión en tu cuenta</p>
      </div>
      <LoginForm />
    </>
  );
}
