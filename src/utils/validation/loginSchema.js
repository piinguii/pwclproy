import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string().email("Email no válido").required("Campo obligatorio"),
  password: Yup.string()
    .min(8, "Mínimo 8 caracteres")
    .max(20, "Máximo 20 caracteres")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Debe contener un carácter especial")
    .required("Campo obligatorio"),
});

export default loginSchema;
