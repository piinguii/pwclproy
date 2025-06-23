"use client";

import React from "react";

// Componente de botón reutilizable
const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // variantes: primary | secondary | danger
  loading = false,
  disabled = false,
  className = "",
}) => {
  // Estilos base + variantes
  const baseClass =
    "inline-flex justify-center items-center px-4 py-2 rounded-md text-sm font-medium transition";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const finalClass = `${baseClass} ${variants[variant]} ${
    disabled || loading ? "opacity-50 cursor-not-allowed" : ""
  } ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={finalClass}
      disabled={disabled || loading}
    >
      {loading ? "Cargando..." : children}
    </button>
  );
};

export default Button;
