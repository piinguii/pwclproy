import LocalStorage from "./localStorage";

const BASE_URL = "https://bildy-rpmaya.koyeb.app/api";

// 📦 Helper para peticiones que requieren token de autenticación
const fetchWithToken = async (endpoint, options = {}) => {
  const token = LocalStorage.getToken();

  // Construimos cabeceras, agregando Authorization si hay token
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  // Realizamos la petición con fetch
  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  // Lanzar error si la respuesta no es exitosa
  if (!res.ok) throw new Error(`Error ${res.status}`);

  // Parseamos y devolvemos el JSON
  return res.json();
};

// ==============================
// User
// ==============================

const user = {
  // Registro: no necesita token
  register: (data) =>
    fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  // Login: guarda token en localStorage si se recibe
  login: async (data) => {
    const res = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (result.token) {
      LocalStorage.setToken(result.token); // 🔐 Guarda token
    }
    return result;
  },

  // Validación: usa fetchWithToken que añade el token a las cabeceras
  validate: (code) =>
    fetchWithToken("/user/validation", {
      method: "PUT",
      body: JSON.stringify({ code }),
    }),

  // Obtener usuario actual
  get: () => fetchWithToken("/user"),
};

// ==============================
// Clients
// ==============================

const clients = {
  getAll: () => fetchWithToken("/client"),
  getOne: (id) => fetchWithToken(`/client/${id}`),

  create: (data) =>
    fetchWithToken("/client", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    fetchWithToken(`/client/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  remove: (id) =>
    fetchWithToken(`/client/${id}`, {
      method: "DELETE",
    }),
};

// ==============================
// Projects
// ==============================

const projects = {
  getAll: () => fetchWithToken("/project"),
  getByClient: (clientId) => fetchWithToken(`/project/${clientId}`),
  getOne: (id) => fetchWithToken(`/project/one/${id}`),

  create: (data) =>
    fetchWithToken("/project", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    fetchWithToken(`/project/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

// ==============================
// Delivery Notes
// ==============================

const deliveryNotes = {
  getAll: () => fetchWithToken("/deliverynote"),
  getOne: (id) => fetchWithToken(`/deliverynote/${id}`),
  getByProject: (projectId) => fetchWithToken(`/deliverynote/project/${projectId}`),

  create: (data) =>
    fetchWithToken("/deliverynote", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    fetchWithToken(`/deliverynote/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Descarga el PDF: esta función genera el blob y fuerza la descarga
  download: async (id) => {
    const res = await fetch(`${BASE_URL}/deliverynote/pdf/${id}`, {
      headers: {
        Authorization: `Bearer ${LocalStorage.getToken()}`,
      },
    });

    if (!res.ok) throw new Error("Error al descargar PDF");

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `albaran_${id}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  },
};

// ==============================
// Export agrupado
// ==============================

const api = {
  user,
  clients,
  projects,
  deliveryNotes,
};

export default api;
