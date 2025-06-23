"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../apiService";

const DeliveryNotesContext = createContext();

export const DeliveryNotesProvider = ({ children }) => {
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDeliveryNotes() {
      try {
        const data = await api.deliveryNotes.getAll();
        setDeliveryNotes(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadDeliveryNotes();
  }, []);

  return (
    <DeliveryNotesContext.Provider value={{ deliveryNotes, loading, error }}>
      {children}
    </DeliveryNotesContext.Provider>
  );
};

export const useDeliveryNotes = () => {
  return useContext(DeliveryNotesContext);
};
