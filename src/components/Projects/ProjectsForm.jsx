"use client";

import { useFormik } from "formik";
import projectSchema from "@/utils/validation/projectSchema";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

const ProjectsForm = ({ formData = {}, onSubmit, handleChange, clients = [] }) => {
  const isEditing = Boolean(formData._id);

  

  const formik = useFormik({
    initialValues: {
      name: formData.name || "",
      notes: formData.notes || "",
      clientId: formData.clientId || "",
    },
    validationSchema: projectSchema,
    onSubmit: (values) => {
      const payload = { ...formData, ...values };
      onSubmit(payload);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 max-w-xl mx-auto">
      <Input
        name="name"
        label="Nombre del Proyecto"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && formik.errors.name ? formik.errors.name : null}
      />

      <Input
        name="notes"
        label="Descripción"
        value={formik.values.notes}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.notes && formik.errors.notes ? formik.errors.notes : null}
        className="resize-none"
      />

      {!isEditing ? (
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Cliente</label>
          <select
            name="clientId"
            value={formik.values.clientId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300 rounded px-4 py-2 w-full transition"
          >
            <option value="">Selecciona un cliente</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>
          {formik.touched.clientId && formik.errors.clientId && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.clientId}</p>
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">Cliente ID: {formik.values.clientId}</p>
      )}

      <Button type="submit">
        {isEditing ? "Actualizar Proyecto" : "Crear Proyecto"}
      </Button>
    </form>
  );
};

export default ProjectsForm;
