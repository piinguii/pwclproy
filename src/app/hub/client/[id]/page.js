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
      const data = await api.clients.getOne(clientId);
      setClientData({ ...data, ...data.address });
      setError(null);
    } catch (err) {
      setError("Error cargando cliente");
      console.error(err);
    }
  };

  const updateClient = async (e) => {
    e.preventDefault();
    if (!clientData) return;

    try {
      const { _id, name, cif, street, number, postal, city, province } = clientData;
      const payload = {
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
      await api.clients.update(_id, payload);
      alert("Cliente actualizado");
      fetchClient(_id);
    } catch (err) {
      setError("Error actualizando cliente");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!clientData) return <p>Cargando cliente...</p>;

  return (
    <div className="container mx-auto p-6">
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
      <ClientsForm formData={clientData} onSubmit={updateClient} handleChange={handleChange} />
    </div>
  );
};

export default ClientDetailPage;
