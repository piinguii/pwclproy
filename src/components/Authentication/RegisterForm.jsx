"use client";

import { useFormik } from "formik";
import registerSchema from "@/utils/validation/registerSchema";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import api from "@/utils/apiService";
import LocalStorage from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        const res = await api.user.register(values);
        if (res.token) {
          LocalStorage.setToken(res.token);
          router.push("/auth/validation");
        }
      } catch (err) {
        alert("Error al registrar usuario");
        console.error(err);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen flex-col px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-md shadow">
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-lg font-bold text-center mb-6 text-blue-600">Crear cuenta</h2>

          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email ? formik.errors.email : null}
          />

          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password ? formik.errors.password : null}
          />

          <Button type="submit" className="w-full mt-4">Registrarse</Button>

          <p className="text-sm text-center text-gray-500 mt-4">
            ¿Ya tienes cuenta?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
