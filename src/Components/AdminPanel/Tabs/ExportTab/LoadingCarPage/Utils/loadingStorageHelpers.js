export const getStorageKey = (cycleId, saleId) =>
  `loading_session_${cycleId}_${saleId || "new"}`;

export const saveSessionLocal = (cycleId, saleId, data) => {
  try {
    const key = getStorageKey(cycleId, saleId);
    const payload = { ...data, updatedAt: Date.now() };
    localStorage.setItem(key, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
};

export const loadSessionLocal = (cycleId, saleId) => {
  try {
    const key = getStorageKey(cycleId, saleId);
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const clearSessionLocal = (cycleId, saleId) => {
  try {
    localStorage.removeItem(getStorageKey(cycleId, saleId));
  } catch {
    // ignore
  }
};
