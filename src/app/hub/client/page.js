"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ClientsList from "@/components/Clients/ClientsList";
import ClientsForm from "@/components/Clients/ClientsForm";
import api from "@/utils/apiService";
import LocalStorage from "@/utils/localStorage";

const ClientPage = () => {
  const router = useRouter();

  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);

  // El formData ya no es necesario aquí porque ClientsForm maneja internamente con Formik.
  // Pero si quieres pasar datos iniciales para edición, puedes hacerlo con `initialData`.

  useEffect(() => {
    const token = LocalStorage.getToken();
    if (!token) {
      router.push("/auth/login");
      return;
    }
    fetchClients();
  }, [router]);

  // Cargar clientes
  const fetchClients = async () => {
    try {
      const data = await api.clients.getAll();
      setClients(data);
      setError(null);
    } catch (err) {
      setError("Error cargando clientes");
      console.error(err);
    }
  };

  // Crear cliente, ahora recibe el payload directamente desde ClientsForm onSubmit
  const createClient = async (payload) => {
    try {
      // Agrupar dirección en un solo objeto
      const clientData = {
        name: payload.name,
        cif: payload.cif,
        address: {
          street: payload.street,
          number: Number(payload.number),
          postal: Number(payload.postal),
          city: payload.city,
          province: payload.province,
        },
      };
      await api.clients.create(clientData);
      alert("Cliente creado correctamente");
      fetchClients();
    } catch (err) {
      setError("Error creando cliente");
      console.error(err);
    }
  };

  

  return (
    <div className="container mx-auto p-6">
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">Crear Nuevo Cliente</h2>
          {/* 
            Pasamos solo la función onSubmit que ahora recibe directamente el payload,
            ya que ClientsForm usa Formik para manejar estado y validaciones.
          */}
          <ClientsForm onSubmit={createClient} />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">Lista de Clientes</h2>
          <ClientsList clients={clients} />
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
