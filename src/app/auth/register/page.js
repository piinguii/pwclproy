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

  return <RegisterForm />;
}
