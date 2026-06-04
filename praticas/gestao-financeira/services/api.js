const BASE_URL = "http://172.27.2.128:3000";

// Debug: print base URL at startup so device logs reveal where requests go
try {
  console.log("[api] BASE_URL=", BASE_URL);
} catch (e) {}

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const config = { headers: { "Content-Type": "application/json" }, ...options };
  const rawBody = config.body;
  if (config.body && typeof config.body !== "string") {
    config.body = JSON.stringify(config.body);
  }

  try {
    console.log("[api] request:", config.method || "GET", url);
    console.log("[api] body:", rawBody);
  } catch (e) {}

  const res = await fetch(url, config).catch((err) => {
    try {
      console.error("[api] fetch error:", err.message || err);
    } catch (e) {}
    throw err;
  });
  const text = await res.text();
  try {
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) {
      const err = new Error(data && data.error ? data.error : res.statusText);
      err.status = res.status;
      err.details = data;
      throw err;
    }
    return data;
  } catch (e) {
    if (e instanceof SyntaxError) {
      if (!res.ok) {
        const err = new Error(res.statusText);
        err.status = res.status;
        throw err;
      }
      return null;
    }
    throw e;
  }
}

// Categories
export async function getCategories() {
  return request("/categories");
}

export async function createCategory(payload) {
  return request("/categories", { method: "POST", body: payload });
}

export async function updateCategory(id, payload) {
  return request(`/categories/${id}`, { method: "PUT", body: payload });
}

export async function deleteCategory(id) {
  return request(`/categories/${id}`, { method: "DELETE" });
}

// Transactions
export async function getTransactions() {
  return request("/transactions");
}

export async function createTransaction(payload) {
  return request("/transactions", { method: "POST", body: payload });
}

export async function deleteTransaction(id) {
  return request(`/transactions/${id}`, { method: "DELETE" });
}

export async function updateTransaction(id, payload) {
  return request(`/transactions/${id}`, { method: "PUT", body: payload });
}

const api = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
};

export default api;
