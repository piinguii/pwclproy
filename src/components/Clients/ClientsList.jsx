import Link from "next/link";

const ClientsList = ({ clients }) => {
  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-4">
        {clients.map((client) => (
          <li key={client._id}>
            <Link href={`/client/${client._id}`}>
              <div className="border rounded p-4 hover:bg-gray-100 transition cursor-pointer">
                <p className="font-semibold">{client.name}</p>
                <p className="text-sm text-gray-600">
                  CIF: {client.cif} – Ciudad: {client.address?.city || "Sin ciudad"}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsList;
