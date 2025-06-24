"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProjectsList from "@/components/Projects/ProjectsList";
import ProjectsForm from "@/components/Projects/ProjectsForm";
import api from "@/utils/apiService";
import LocalStorage from "@/utils/localStorage";

const ProjectsPage = () => {
  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = LocalStorage.getToken();
    if (!token) {
      router.push("/auth/login");
      return;
    }
    fetchProjects();
    fetchClients();
  }, [router]);

  const fetchProjects = async () => {
    try {
      const data = await api.projects.getAll();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError("Error cargando proyectos");
      console.error(err);
    }
  };

  const fetchClients = async () => {
    try {
      const data = await api.clients.getAll();
      setClients(data);
    } catch (err) {
      console.error("Error cargando clientes", err);
    }
  };

  // Ahora recibe directamente los valores del formulario (payload)
  const createProject = async (payload) => {
    try {
      await api.projects.create(payload);
      alert("Proyecto creado exitosamente");
      fetchProjects();
    } catch (err) {
      setError("Error creando proyecto");
      console.error(err);
    }
  };

  

  return (
    <div className="container mx-auto p-6">
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">Crear Nuevo Proyecto</h2>
          {/* Pasamos solo onSubmit sin formData ni handleChange porque ProjectsForm usa Formik */}
          <ProjectsForm clients={clients} onSubmit={createProject} />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">Lista de Proyectos</h2>
          <ProjectsList projects={projects} />
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
