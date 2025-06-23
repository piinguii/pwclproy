import * as Yup from "yup";

const projectSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  description: Yup.string().required("La descripción es obligatoria"),
  clientId: Yup.string().required("El cliente es obligatorio"),
});

export default projectSchema;
