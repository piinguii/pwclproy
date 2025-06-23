"use client";

import LoginForm from "@/components/Authentication/LoginForm";
import Link from "next/link";
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
        <p className="text-gray-500">Sign in to your account</p>
      </div>
      <LoginForm />
      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="text-gray-800 hover:text-gray-600 transition-colors duration-200"
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}
