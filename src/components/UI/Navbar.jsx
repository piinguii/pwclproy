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
        setUserEmail(userData.email); // or set whole user if you want
        LocalStorageManager.setUser(userData); // Optionally cache in localStorage
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
    <header>
      {/* ... */}
      <div>
        {userEmail ? (
          <>
            <span>Hello, {userEmail}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <span>Not authenticated</span>
        )}
      </div>
    </header>
  );
};

export default Navbar;
