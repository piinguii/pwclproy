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
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-indigo-700 via-blue-700 to-blue-900 text-white p-6 shadow-lg flex flex-col justify-between">
      {/* Logo y navegación */}
      <div>
        <h2 className="text-3xl font-extrabold mb-10 tracking-wide select-none">Bildy App</h2>
        <nav className="flex flex-col gap-3 text-sm font-medium">
          {[
            { href: "/hub", label: "Inicio" },
            { href: "/hub/client", label: "Clientes" },
            { href: "/hub/projects", label: "Proyectos" },
            { href: "/hub/deliverynotes", label: "Albaranes" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block rounded-md px-4 py-2 hover:bg-blue-500 transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Usuario actual */}
        {user && (
          <div className="mt-12 p-4 bg-blue-800 rounded-md shadow-inner text-sm select-text">
            <p className="mb-1 text-blue-300 uppercase tracking-wide font-semibold">Usuario</p>
            <p className="truncate font-semibold">{user.name || user.email}</p>
          </div>
        )}
      </div>

      
      <Footer className="text-sm text-blue-300 pt-4" />
    </aside>
  );
};

export default Sidebar;
