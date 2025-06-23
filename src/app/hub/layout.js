"use client";

import Sidebar from "@/components/UI/Sidebar";
import Navbar from "@/components/UI/Navbar";
import { ClientsProvider } from "@/utils/contexts/useClients";
import { ProjectsProvider } from "@/utils/contexts/useProjects";
import { DeliveryNotesProvider } from "@/utils/contexts/useDeliveryNotes";
import { useRouter } from "next/navigation";
import LocalStorageManager from "@/utils/localStorage";
import { useEffect, useState } from "react";

export default function HubLayout({ children }) {
  const router = useRouter();
  const [loadingUser, setLoadingUser] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const token = LocalStorageManager.getToken();
    if (!token && !redirecting) {
      setRedirecting(true);
      router.push("/auth/login");
    } else {
      setLoadingUser(false);
    }
  }, [router, redirecting]);

  if (loadingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar /> {/* Sidebar fijo */}

      {/* Contenedor para navbar + contenido con margen izquierdo */}
      <div className="flex flex-col flex-1 ml-64 min-h-screen">
        {/* Navbar ocupa todo el ancho restante y sticky */}
        <Navbar />

        {/* Providers y contenido */}
        <ClientsProvider>
          <ProjectsProvider>
            <DeliveryNotesProvider>
              <main className="flex-grow p-6 overflow-auto">{children}</main>
            </DeliveryNotesProvider>
          </ProjectsProvider>
        </ClientsProvider>
      </div>
    </div>
  );
}
