import * as Yup from "yup";

const projectSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  notes: Yup.string().required("Las notas son obligatorias"),
  clientId: Yup.string().required("El cliente es obligatorio"),
});

export default projectSchema;
