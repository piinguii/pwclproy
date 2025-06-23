import * as Yup from "yup";

const deliveryNoteSchema = Yup.object({
  clientId: Yup.string().required("El cliente es obligatorio"),
  projectId: Yup.string().required("El proyecto es obligatorio"),
  format: Yup.string()
    .oneOf(["material", "hours"])
    .required("El formato es obligatorio"),
  material: Yup.string().required("El material es obligatorio"),
  hours: Yup.number()
    .min(0, "Las horas no pueden ser negativas")
    .required("Las horas son obligatorias"),
  description: Yup.string().required("La descripción es obligatoria"),
  workdate: Yup.string().required("La fecha es obligatoria"),
});

export default deliveryNoteSchema;
