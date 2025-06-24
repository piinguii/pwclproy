import Link from "next/link";

const ClientsList = ({ clients }) => {
  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-4">
        {clients.map((client) => (
          <li key={client._id}>
            <Link href={`/hub/client/${client._id}`}>
              <div className="border rounded p-4 hover:bg-gray-100 transition cursor-pointer">
                <p className="font-semibold">{client.name}</p>
                <p className="text-sm text-gray-600">
                  CIF: {client.cif} – Ciudad: {client.address?.city || "Sin ciudad"}
                </p>
                <p className="text-xs text-gray-500">Calle: {client.address?.street || "Sin calle"}</p>
                <p className="text-xs text-gray-500">Número: {client.address?.number || "Sin número"}</p>
                <p className="text-xs text-gray-500">Código Postal: {client.address?.postal || "Sin código postal"}</p>
                <p className="text-xs text-gray-500">Provincia: {client.address?.province || "Sin provincia"}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsList;
