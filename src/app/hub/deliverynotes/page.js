"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DeliveryNoteForm from "@/components/DeliveryNotes/DeliveryNoteForm";
import DeliveryNotesList from "@/components/DeliveryNotes/DeliveryNotesList";
import api from "@/utils/apiService";
import LocalStorage from "@/utils/localStorage";

const DeliveryNotesPage = () => {
  const router = useRouter();

  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    projectId: "",
    format: "",
    material: "",
    hours: "",
    workdate: "",
    clientId: "",
  });

  useEffect(() => {
    const token = LocalStorage.getToken();
    if (!token) {
      router.push("/auth/login");
      return;
    }
    fetchDeliveryNotes();
    fetchProjects();
  }, [router]);

  const fetchDeliveryNotes = async () => {
    try {
      const data = await api.deliveryNotes.getAll();
      setDeliveryNotes(data);
      setError(null);
    } catch (err) {
      setError("Error cargando albaranes");
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const data = await api.projects.getAll();
      setProjects(data);
    } catch (err) {
      console.error("Error cargando proyectos", err);
    }
  };

  // Ahora recibe solo values (no evento)
  const createDeliveryNote = async (values) => {
    try {
      await api.deliveryNotes.create(values);
      alert("Albarán creado correctamente");
      setFormData({
        description: "",
        projectId: "",
        format: "",
        material: "",
        hours: "",
        workdate: "",
        clientId: "",
      });
      fetchDeliveryNotes();
    } catch (err) {
      setError("Error creando albarán");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto p-6">
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">Crear Nuevo Albarán</h2>
          <DeliveryNoteForm
            projects={projects}
            deliveryNote={formData}
            onSubmit={createDeliveryNote} // Formik passes only values here
          />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">Lista de Albaranes</h2>
          <DeliveryNotesList deliveryNotes={deliveryNotes} />
        </div>
      </div>
    </div>
  );
};

export default DeliveryNotesPage;
