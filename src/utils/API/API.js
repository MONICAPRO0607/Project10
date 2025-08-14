const BASE_URL = "http://localhost:3000/api/v1";

export const API = async ({ endpoint, token, method = "GET", body }) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, options);
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Error en API:", err);
    throw err;
  }
};