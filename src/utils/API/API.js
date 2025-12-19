const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error("❌ VITE_API_URL no está definida. Revisa el .env");
}

export const API = async ({ endpoint, token, method = "GET", body }) => {
   const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) options.headers.Authorization = `Bearer ${token}`;
  if (body) options.body = JSON.stringify(body);

    try {
    const url = `${BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;
    const res = await fetch(url, options);
    if (!res.ok) {
      const text = await res.text().catch(() => null);
      throw new Error(`Error ${res.status}: ${res.statusText} ${text ? ' - ' + text : ''}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Error en API:", err);
    throw err;
  }
};