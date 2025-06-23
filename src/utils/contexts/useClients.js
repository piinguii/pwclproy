"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../apiService";

const ClientsContext = createContext();

export const ClientsProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadClients() {
      try {
        const data = await api.clients.getAll();
        setClients(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadClients();
  }, []);

  return (
    <ClientsContext.Provider value={{ clients, loading, error }}>
      {children}
    </ClientsContext.Provider>
  );
};

export const useClients = () => {
  return useContext(ClientsContext);
};
