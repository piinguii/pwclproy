"use client";

import { useState, useEffect } from "react";
import LocalStorageManager from "@/utils/localStorage";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = LocalStorageManager.getToken();
        if (!token) {
          setUserEmail(null);
          return;
        }
        const response = await fetch("https://bildy-rpmaya.koyeb.app/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch user");
        const userData = await response.json();
        setUserEmail(userData.email);
        LocalStorageManager.setUser(userData);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setUserEmail(null);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    LocalStorageManager.logout();
    router.push("/auth/login");
  };

  return (
    <header className="bg-white border-b shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4 gap-8">

        <div className="flex items-center gap-6">
          {userEmail ? (
            <>
              <span className="text-gray-700 font-medium whitespace-nowrap">
                Hola, {userEmail}
              </span>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <span className="text-gray-400 italic select-none whitespace-nowrap">
              No autenticado
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
