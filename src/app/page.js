"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LocalStorageManager from "@/utils/localStorage";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const token = LocalStorageManager.getToken();
    if (token) {
      router.push("/hub"); // Usuario logueado
    } else {
      router.push("/auth/login"); // Usuario no logueado
    }
  }, [router]);

  return null; // Nada que mostrar aquí
}
