import Link from "next/link";
import DownloadDeliveryNote from "./DownloadDeliveryNote";

const DeliveryNotesList = ({ deliveryNotes }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <ul className="flex flex-col gap-4">
        {deliveryNotes.map((note) => (
          <li key={note._id}>
            <div className="border rounded p-4 shadow-sm hover:shadow-md transition">
              {/* Descripción principal */}
              <h3 className="text-lg font-bold text-gray-800 mb-1">{note.description}</h3>

              {/* Detalles */}
              <div className="text-sm text-gray-600 space-y-1 mb-3">
                <p><strong>Proyecto:</strong> {note.projectId?.name || note.projectId || "N/A"}</p>
                <p><strong>Cliente:</strong> {note.clientId?.name || note.clientId || "N/A"}</p>
                <p><strong>Horas:</strong> {note.hours}</p>
                <p><strong>Formato:</strong> {note.format}</p>
                <p>
                  <strong>Estado:</strong>{" "}
                  <span className={`font-semibold ${note.pending ? "text-yellow-600" : "text-green-600"}`}>
                    {note.pending ? "Pendiente" : "Firmado"}
                  </span>
                </p>
                <p>
                  <strong>Fecha creación:</strong>{" "}
                  {new Date(note.createdAt).toLocaleDateString("es-ES")}
                </p>
              </div>

              {/* Botones */}
              <div className="flex justify-between">
                <DownloadDeliveryNote noteId={note._id} />
                <Link
                  href={`/hub/deliverynotes/${note._id}`}
                  className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Editar
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeliveryNotesList;
