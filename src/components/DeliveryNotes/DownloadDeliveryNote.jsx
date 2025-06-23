"use client";

import { useState } from "react";
import api from "@/utils/apiService";

const DownloadDeliveryNote = ({ noteId }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      await api.deliveryNotes.download(noteId);
    } catch (error) {
      alert("Error al descargar el albarán.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className={`text-sm font-medium px-4 py-2 rounded transition ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
      } text-white shadow`}
    >
      {loading ? "Descargando..." : "Descargar PDF"}
    </button>
  );
};

export default DownloadDeliveryNote;
