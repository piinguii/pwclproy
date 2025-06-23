"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ProjectsForm from "@/components/Projects/ProjectsForm";
import api from "@/utils/apiService";
import LocalStorage from "@/utils/localStorage";

const ProjectDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = LocalStorage.getToken();
    if (!token) {
      router.push("/auth/login");
      return;
    }
    if (id) {
      fetchProject(id);
      fetchClients();
    }
  }, [id, router]);

  const fetchProject = async (projectId) => {
    try {
      const data = await api.projects.getOne(projectId);
      setProject(data);
      setError(null);
    } catch (err) {
      setError("Error cargando proyecto");
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

  const updateProject = async (e) => {
    e.preventDefault();
    try {
      await api.projects.update(id, project);
      alert("Proyecto actualizado");
      fetchProject(id);
    } catch (err) {
      setError("Error actualizando proyecto");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  if (!project) return <p>Cargando proyecto...</p>;

  return (
    <div className="container mx-auto p-6">
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <h2 className="text-xl font-bold mb-4">Editar Proyecto</h2>
      <ProjectsForm clients={clients} formData={project} onSubmit={updateProject} handleChange={handleChange} />
    </div>
  );
};

export default ProjectDetailPage;
