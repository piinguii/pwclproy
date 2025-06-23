"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import DeliveryNoteForm from "@/components/DeliveryNotes/DeliveryNoteForm";
import api from "@/utils/apiService";
import LocalStorage from "@/utils/localStorage";

const DeliveryNoteDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [deliveryNote, setDeliveryNote] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = LocalStorage.getToken();
    if (!token) {
      router.push("/auth/login");
      return;
    }
    if (id) {
      fetchDeliveryNote(id);
      fetchProjects();
    }
  }, [id, router]);

  const fetchDeliveryNote = async (noteId) => {
    try {
      const data = await api.deliveryNote.getOne(noteId);
      setDeliveryNote(data);
      setError(null);
    } catch (err) {
      setError("Error cargando albarán");
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const data = await api.projects.get();
      setProjects(data);
    } catch (err) {
      console.error("Error cargando proyectos", err);
    }
  };

  const updateDeliveryNote = async (e) => {
    e.preventDefault();
    try {
      await api.deliveryNote.update(id, deliveryNote);
      alert("Albarán actualizado");
      fetchDeliveryNote(id);
    } catch (err) {
      setError("Error actualizando albarán");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryNote((prev) => ({ ...prev, [name]: value }));
  };

  if (!deliveryNote) return <p>Cargando albarán...</p>;

  return (
    <div className="container mx-auto p-6">
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <h2 className="text-xl font-bold mb-4">Editar Albarán</h2>
      <DeliveryNoteForm
        projects={projects}
        deliveryNote={deliveryNote}
        onSubmit={updateDeliveryNote}
        handleChange={handleChange}
      />
    </div>
  );
};

export default DeliveryNoteDetailPage;
