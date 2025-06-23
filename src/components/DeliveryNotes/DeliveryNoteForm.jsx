"use client";

import { useFormik } from "formik";
import deliveryNoteSchema from "@/utils/validation/deliveryNoteSchema";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

const DeliveryNoteForm = ({ deliveryNote = {}, projects = [], onSubmit }) => {
  const isEditing = Boolean(deliveryNote._id);

  const formik = useFormik({
    initialValues: {
      projectId: deliveryNote.projectId || "",
      clientId: deliveryNote.clientId || "",
      format: deliveryNote.format || "",
      material: deliveryNote.material || "",
      hours: deliveryNote.hours || "",
      workdate: deliveryNote.workdate || "",
      description: deliveryNote.description || "",
    },
    validationSchema: deliveryNoteSchema,
    onSubmit: (values) => {
      const date = new Date(values.workdate);
      const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
        date.getMonth() + 1
      ).padStart(2, "0")}/${date.getFullYear()}`;

      const payload = {
        ...deliveryNote,
        ...values,
        workdate: formattedDate,
      };
      onSubmit(payload);
    },
  });

  const handleProjectChange = (e) => {
    const value = e.target.value;
    const selectedProject = projects.find((p) => p._id === value);
    formik.setFieldValue("projectId", value);
    formik.setFieldValue("clientId", selectedProject?.clientId || "");
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-5 max-w-xl mx-auto"
    >
      {/* Proyecto */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Proyecto</label>
        <select
          name="projectId"
          value={formik.values.projectId}
          onChange={handleProjectChange}
          onBlur={formik.handleBlur}
          className="bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300 rounded px-4 py-2 w-full transition"
        >
          <option value="">Selecciona un proyecto</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>
        {formik.touched.projectId && formik.errors.projectId && (
          <p className="text-sm text-red-500">{formik.errors.projectId}</p>
        )}
      </div>

      {/* Cliente (readonly) */}
      <Input
        name="clientId"
        label="Cliente"
        value={formik.values.clientId}
        readOnly
        className="bg-gray-200 cursor-not-allowed"
        error={formik.touched.clientId && formik.errors.clientId ? formik.errors.clientId : null}
      />

      {/* Formato */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Formato</label>
        <select
          name="format"
          value={formik.values.format}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300 rounded px-4 py-2 w-full transition"
        >
          <option value="">Selecciona formato</option>
          <option value="material">Material</option>
          <option value="hours">Horas</option>
        </select>
        {formik.touched.format && formik.errors.format && (
          <p className="text-sm text-red-500">{formik.errors.format}</p>
        )}
      </div>

      {/* Material y Horas */}
      <div className="flex gap-4">
        <Input
          name="material"
          label="Material"
          value={formik.values.material}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.material && formik.errors.material ? formik.errors.material : null}
          className="w-1/2"
        />
        <Input
          name="hours"
          type="number"
          label="Horas"
          value={formik.values.hours}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.hours && formik.errors.hours ? formik.errors.hours : null}
          className="w-1/2"
        />
      </div>

      {/* Fecha */}
      <Input
        name="workdate"
        type="date"
        label="Fecha de trabajo"
        value={formik.values.workdate}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.workdate && formik.errors.workdate ? formik.errors.workdate : null}
      />

      {/* Descripción */}
      <Input
        name="description"
        label="Descripción"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && formik.errors.description ? formik.errors.description : null}
        className="resize-none"
      />

      <Button type="submit">
        {isEditing ? "Actualizar Albarán" : "Crear Albarán"}
      </Button>
    </form>
  );
};

export default DeliveryNoteForm;
