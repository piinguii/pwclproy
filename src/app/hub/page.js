"use client";

import { useState, useEffect } from "react";
import { useProjects } from "@/utils/contexts/useProjects";
import { useClients } from "@/utils/contexts/useClients";
import Link from "next/link";

export default function HomePage() {
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const { projects } = useProjects();
  const { clients } = useClients();

  useEffect(() => {
    async function fetchDeliveryNotes() {
      try {
        const token = localStorage.getItem("jwt");
        const response = await fetch("https://bildy-rpmaya.koyeb.app/api/deliverynote", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setDeliveryNotes(data);
      } catch (err) {
        console.error("Error fetching delivery notes:", err);
      }
    }
    fetchDeliveryNotes();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Título principal */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Gestiona tus proyectos con eficiencia
        </h1>
        <p className="mt-3 text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          Visualiza tus clientes, proyectos y albaranes en un solo lugar.
        </p>
      </header>

      {/* Estadísticas principales */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-14">
        <Link
          href="/hub/projects"
          className="group bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-lg rounded-xl p-8 cursor-pointer hover:scale-105 transform transition-transform"
        >
          <div className="flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-white group-hover:text-indigo-100"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 17v-6a4 4 0 018 0v6" />
              <rect x="3" y="9" width="4" height="11" rx="1" />
              <rect x="13" y="9" width="4" height="11" rx="1" />
            </svg>
          </div>
          <h3 className="text-white text-xl font-semibold mb-1">Proyectos</h3>
          <p className="text-indigo-100 text-4xl font-extrabold">{projects?.length || 0}</p>
        </Link>

        <Link
          href="/hub/client"
          className="group bg-gradient-to-r from-green-600 to-green-400 shadow-lg rounded-xl p-8 cursor-pointer hover:scale-105 transform transition-transform"
        >
          <div className="flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-white group-hover:text-green-100"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21a6.5 6.5 0 0113 0" />
            </svg>
          </div>
          <h3 className="text-white text-xl font-semibold mb-1">Clientes</h3>
          <p className="text-green-100 text-4xl font-extrabold">{clients?.length || 0}</p>
        </Link>

        <Link
          href="/hub/deliverynotes"
          className="group bg-gradient-to-r from-pink-600 to-pink-400 shadow-lg rounded-xl p-8 cursor-pointer hover:scale-105 transform transition-transform"
        >
          <div className="flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-white group-hover:text-pink-100"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 8v4l3 3" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <h3 className="text-white text-xl font-semibold mb-1">Albaranes</h3>
          <p className="text-pink-100 text-4xl font-extrabold">{deliveryNotes?.length || 0}</p>
        </Link>
      </section>

      {/* Actividad Reciente */}
      <section className="bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Actividad Reciente</h2>
        {deliveryNotes.length === 0 ? (
          <p className="text-center text-gray-500">No hay actividad reciente</p>
        ) : (
          <ul className="space-y-4">
            {deliveryNotes.slice(0, 5).map((note) => (
              <li
                key={note._id}
                className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-b-0"
              >
                <div>
                  <Link
                    href={`/hub/deliverynotes/${note._id}`}
                    className="text-lg font-medium text-gray-900 hover:text-indigo-600 transition"
                  >
                    {note.description}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {note.projectId?.name || note.projectId} —{" "}
                    {clients.find((c) => c._id === note.clientId)?.name || "Cliente desconocido"}
                  </p>
                </div>
                <time className="text-sm text-gray-400">
                  {new Date(note.workdate).toLocaleDateString()}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
