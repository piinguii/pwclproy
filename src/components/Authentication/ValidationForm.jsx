"use client";
import React, { useState } from "react";

import { useFormik } from "formik";
import validationSchema from "@/utils/validation/validationSchema";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import api from "@/utils/apiService";
import LocalStorage from "@/utils/localStorage"; // helper localStorage

const ValidationForm = ({ token, onSuccess, onCancel }) => {
  const [loading, setLoading] = React.useState(false);
  const [apiError, setApiError] = React.useState(null);

  const formik = useFormik({
    initialValues: { code: "" },
    validationSchema,
    onSubmit: async (values) => {
      setApiError(null);
      const actualToken = token || LocalStorage.getToken();

      if (!actualToken) {
        setApiError("No hay token disponible.");
        return;
      }

      setLoading(true);
      try {
        await api.user.validate(values.code, actualToken);

        setLoading(false);
        if (onSuccess) onSuccess();
      } catch (err) {
        setLoading(false);
        setApiError("El código es incorrecto o expiró.");
        console.error(err);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-md shadow">
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-lg font-bold text-center mb-6 text-blue-600">
            Validar cuenta
          </h2>

          <Input
            type="text"
            name="code"
            placeholder="Código de 6 dígitos"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.code && formik.errors.code ? formik.errors.code : null}
            disabled={loading}
          />

          {apiError && <p className="text-red-500 mt-2 text-center">{apiError}</p>}

          <div className="flex justify-between items-center mt-4">
            <Button type="submit" className="w-full mr-2" disabled={loading}>
              {loading ? "Validando..." : "Validar"}
            </Button>
            <button
              type="button"
              className="text-blue-600 underline ml-2"
              onClick={() => {
                if (!loading && onCancel) onCancel();
              }}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ValidationForm;
