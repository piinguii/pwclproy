import Link from "next/link";

export default function RecentActivity({ deliveryNotes, clients }) {
  return (
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
  );
} 