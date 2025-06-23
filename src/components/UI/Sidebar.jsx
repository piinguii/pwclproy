"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LocalStorageManager from "@/utils/localStorage";
import Footer from "@/components/UI/Footer";

const Sidebar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = LocalStorageManager.getUser();
    setUser(currentUser);
  }, []);

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-blue-600 text-white p-6 shadow-md flex flex-col justify-between">
      {/* Logo y navegación */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Bildy App</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/hub" className="hover:bg-blue-500 rounded px-3 py-2 transition">
            Inicio
          </Link>
          <Link href="/hub/client" className="hover:bg-blue-500 rounded px-3 py-2 transition">
            Clientes
          </Link>
          <Link href="/hub/projects" className="hover:bg-blue-500 rounded px-3 py-2 transition">
            Proyectos
          </Link>
          <Link href="/hub/deliverynotes" className="hover:bg-blue-500 rounded px-3 py-2 transition">
            Albaranes
          </Link>
        </nav>

        {/* Usuario actual */}
        {user && (
          <div className="mt-8 px-3 py-2 bg-blue-700 rounded">
            <p className="text-sm">Usuario:</p>
            <p className="font-semibold truncate max-w-full">{user.name || user.email}</p>
          </div>
        )}
      </div>

      {/* Footer importado de UI */}
      <Footer />
    </aside>
  );
};

export default Sidebar;
