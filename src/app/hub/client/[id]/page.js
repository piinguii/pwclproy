"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ClientsForm from "@/components/Clients/ClientsForm";
import api from "@/utils/apiService";
import LocalStorage from "@/utils/localStorage";

const ClientDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [clientData, setClientData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const token = LocalStorage.getToken();
    if (!token) {
      router.push("/auth/login");
      return;
    }

    fetchClient(id);
  }, [id, router]);

  const fetchClient = async (clientId) => {
    try {
      setLoading(true);
      const data = await api.clients.getOne(clientId);
      // "Desempaqueta" dirección en los campos para el formulario
      setClientData({ ...data, ...data.address });
      setError(null);
    } catch (err) {
      setError("Error cargando cliente");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateClient = async (payload) => {
    try {
      const { _id, name, cif, street, number, postal, city, province } = payload;
      const bodyPayload = {
        name,
        cif,
        address: {
          street,
          number: Number(number),
          postal: Number(postal),
          city,
          province,
        },
      };
      await api.clients.update(_id, bodyPayload);
      alert("Cliente actualizado");
      fetchClient(_id); // Recarga datos actualizados
    } catch (err) {
      setError("Error actualizando cliente");
      console.error(err);
    }
  };

  if (loading) return <p>Cargando cliente...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!clientData) return <p>No se encontró el cliente.</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
      <ClientsForm initialData={clientData} onSubmit={updateClient} />
    </div>
  );
};

export default ClientDetailPage;
