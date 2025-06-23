"use client";

import RegisterForm from "@/components/Authentication/RegisterForm";
import { useRouter } from "next/navigation";
import LocalStorage from "@/utils/localStorage";
import { useEffect } from "react";

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    const token = LocalStorage.getToken();
    if (token) {
      router.push("/hub");
    }
  }, [router]);

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-light text-gray-800 tracking-tight mb-2">
          Bildy 
        </h1>
        <p className="text-gray-500">Crea una cuenta</p>
      </div>
      <RegisterForm />
    </>
  );
}
