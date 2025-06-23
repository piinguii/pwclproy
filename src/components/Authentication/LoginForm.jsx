"use client";

import { useFormik } from "formik";
import loginSchema from "@/utils/validation/loginSchema";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import api from "@/utils/apiService";
import LocalStorage from "@/utils/localStorage";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const res = await api.user.login(values);
        if (res.token) {
          LocalStorage.setToken(res.token);

          // Obtener usuario usando el token
          const user = await api.user.get();

          // Guardar usuario en localStorage para mostrar en Navbar
          LocalStorage.setUser(user);

          router.push("/hub");
        }
      } catch (err) {
        alert("Error al iniciar sesión");
        console.error(err);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen flex-col px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-md shadow">
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-lg font-bold text-center mb-6 text-blue-600">
            Iniciar sesión
          </h2>

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

          <Button type="submit" className="w-full mt-4">
            Iniciar sesión
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
