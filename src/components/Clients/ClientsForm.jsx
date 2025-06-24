"use client";

import { useFormik } from "formik";
import clientSchema from "@/utils/validation/clientSchema";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

const ClientsForm = ({ initialData = {}, onSubmit }) => {
  const isEditing = Boolean(initialData._id);

  const formik = useFormik({
    enableReinitialize: true, // Muy importante para que el form actualice al cambiar initialData
    initialValues: {
      name: initialData.name || "",
      cif: initialData.cif || "",
      street: initialData.street || "",
      number: initialData.number || "",
      postal: initialData.postal || "",
      city: initialData.city || "",
      province: initialData.province || "",
    },
    validationSchema: clientSchema,
    onSubmit: (values) => {
      const payload = { ...initialData, ...values };
      onSubmit(payload);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 max-w-xl mx-auto">
      <Input
        name="name"
        label="Nombre"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && formik.errors.name ? formik.errors.name : null}
      />
      <Input
        name="cif"
        label="CIF"
        value={formik.values.cif}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.cif && formik.errors.cif ? formik.errors.cif : null}
      />
      <Input
        name="street"
        label="Calle"
        value={formik.values.street}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.street && formik.errors.street ? formik.errors.street : null}
      />
      <Input
        name="number"
        label="Número"
        type="number"
        value={formik.values.number}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.number && formik.errors.number ? formik.errors.number : null}
      />
      <Input
        name="postal"
        label="Código Postal"
        type="number"
        value={formik.values.postal}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.postal && formik.errors.postal ? formik.errors.postal : null}
      />
      <Input
        name="city"
        label="Ciudad"
        value={formik.values.city}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.city && formik.errors.city ? formik.errors.city : null}
      />
      <Input
        name="province"
        label="Provincia"
        value={formik.values.province}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.province && formik.errors.province ? formik.errors.province : null}
      />
      <Button type="submit">{isEditing ? "Actualizar Cliente" : "Crear Cliente"}</Button>
    </form>
  );
};

export default ClientsForm;
