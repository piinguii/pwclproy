import * as Yup from "yup";

const clientSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  cif: Yup.string().required("El CIF es obligatorio"),
  street: Yup.string().required("La calle es obligatoria"),
  number: Yup.string().required("El número es obligatorio"),
  postal: Yup.string().required("El código postal es obligatorio"),
  city: Yup.string().required("La ciudad es obligatoria"),
  province: Yup.string().required("La provincia es obligatoria"),
});

export default clientSchema;
