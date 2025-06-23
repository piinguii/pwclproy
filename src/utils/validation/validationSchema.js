import * as Yup from "yup";

const validationSchema = Yup.object({
  code: Yup.string()
    .matches(/^\d{6}$/, "El código debe tener exactamente 6 números")
    .required("El código es obligatorio"),
});

export default validationSchema;
