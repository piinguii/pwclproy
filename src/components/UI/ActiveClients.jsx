export default function ActiveClients({ clients }) {
  const sortedClients = clients
    .sort((a, b) => (b.activeProjects || 0) - (a.activeProjects || 0))
    .slice(0, 5);

  return (
    <section className="bg-white rounded-xl shadow p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Clientes Más Activos</h2>
      {clients.length === 0 ? (
        <p className="text-center text-gray-500">No hay clientes para mostrar</p>
      ) : (
        <ul className="space-y-4">
          {sortedClients.map((client) => (
            <li key={client._id} className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium text-gray-800">{client.name}</span>
              <span className="text-sm text-gray-500">{client.activeProjects || 0} proyectos activos</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
} 