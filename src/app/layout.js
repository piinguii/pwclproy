import "./globals.css";
import { ProjectsProvider } from "@/utils/contexts/useProjects";
import { ClientsProvider } from "@/utils/contexts/useClients";

export const metadata = {
  title: "HUB",
  description: "Nexus hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-neutral-50">
        <ClientsProvider>
          <ProjectsProvider>
            {children}
          </ProjectsProvider>
        </ClientsProvider>
      </body>
    </html>
  );
}
