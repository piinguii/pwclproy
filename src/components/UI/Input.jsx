"use client";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  placeholder = "",
  className = "",
  readOnly = false,  // <-- nueva prop para controlar si es solo lectura
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={readOnly ? undefined : onChange}  // solo pasa onChange si NO es readonly
        onBlur={onBlur}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          error ? "border-red-500" : "border-gray-300"
        } ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
