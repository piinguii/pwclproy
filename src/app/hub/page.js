"use client";

import { useProjects } from "@/utils/contexts/useProjects";
import { useClients } from "@/utils/contexts/useClients";
import { useDeliveryNotes } from "@/utils/contexts/useDeliveryNotes"; 
import Link from "next/link";

export default function HomePage() {
  const { deliveryNotes, loading: loadingDN, error: errorDN } = useDeliveryNotes();
  const { projects } = useProjects();
  const { clients } = useClients();

  if (loadingDN) return <p className="text-center mt-12">Cargando albaranes...</p>;
  if (errorDN) return <p className="text-center mt-12 text-red-600">Error cargando albaranes</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* Actividad Reciente centrada */}
      <section className="bg-white rounded-xl shadow-lg p-10 max-w-2xl mx-auto mb-20 flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Actividad Reciente</h2>
        {deliveryNotes.length === 0 ? (
          <p className="text-center text-gray-500">No hay actividad reciente</p>
        ) : (
          <ul className="space-y-6 w-full">
            {deliveryNotes.slice(0, 5).map((note) => (
              <li
                key={note._id}
                className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-b-0"
              >
                <div>
                  <Link
                    href={`/hub/deliverynotes/${note._id}`}
                    className="text-lg font-medium text-gray-900 hover:text-indigo-600 transition"
                  >
                    {note.description}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
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

      <section className="bg-white rounded-xl shadow p-8 max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Clientes Más Activos
    </h2>

  {clients.length === 0 ? (
    <p className="text-center text-gray-500">No hay clientes para mostrar</p>
  ) : (
    <ul className="space-y-4 text-center text-lg">
      {clients
        .sort((a, b) => (b.activeProjects || 0) - (a.activeProjects || 0)) // Ordena por proyectos activos
        .slice(0, 5) // Solo los top 5
        .map((client) => (
          <li
            key={client._id}
            className="border-b border-gray-100 pb-2"
          >
            {client.name}: {client.activeProjects || 0} proyectos activos
          </li>
        ))}
    </ul>
  )}
</section>



      {/* Estadísticas separadas abajo */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-12">
        {[{
          href: "/hub/projects",
          colorFrom: "indigo-600",
          colorTo: "indigo-400",
          label: "Proyectos",
          count: projects?.length || 0,
          countColor: "text-indigo-100",
          icon: (
            <svg
              className="w-10 h-10 text-white"
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
          ),
        }, {
          href: "/hub/client",
          colorFrom: "green-600",
          colorTo: "green-400",
          label: "Clientes",
          count: clients?.length || 0,
          countColor: "text-green-100",
          icon: (
            <svg
              className="w-10 h-10 text-white"
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
          ),
        }, {
          href: "/hub/deliverynotes",
          colorFrom: "pink-600",
          colorTo: "pink-400",
          label: "Albaranes",
          count: deliveryNotes?.length || 0,
          countColor: "text-pink-100",
          icon: (
            <svg
              className="w-10 h-10 text-white"
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
          ),
        }].map(({ href, colorFrom, colorTo, icon, label, count, countColor }) => (
          <Link
            key={label}
            href={href}
            className={`group bg-gradient-to-r from-${colorFrom} to-${colorTo} shadow-lg rounded-xl p-8 cursor-pointer hover:scale-105 transform transition-transform flex flex-col items-center justify-center`}
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-white text-xl font-semibold mb-1">{label}</h3>
            <p className={`text-4xl font-extrabold ${countColor}`}>{count}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
