"use client";

import ValidationForm from "@/components/Authentication/ValidationForm";
import { useRouter } from "next/navigation";
import LocalStorage from "@/utils/localStorage";
import { useEffect, useState } from "react";

export default function ValidationPage() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromStorage = LocalStorage.getToken();
    if (!tokenFromStorage) {
      router.push("/auth/register");
    } else {
      setToken(tokenFromStorage);
    }
  }, [router]);

  // Función que se llama cuando la validación es exitosa
  const handleSuccess = () => {
    router.push("/auth/login"); // Redirige a login o a hub si quieres
  };

  // Función para cancelar (por ejemplo volver a registro)
  const handleCancel = () => {
    router.push("/auth/register");
  };

  return token ? (
    <ValidationForm token={token} onSuccess={handleSuccess} onCancel={handleCancel} />
  ) : null;
}
