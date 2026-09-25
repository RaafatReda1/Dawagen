/**
 * Helper utilities for extracting values from JSONB fields without guessing or hardcoding logic.
 */

/**
 * Extracts total sum from payments JSONB field.
 * Payment object format in DB: [{ id: "payment1", value: 5000, wayOfPayment: "cash" }, ...]
 */
export const extractPaymentsSum = (paymentsJson) => {
  if (!paymentsJson) return 0;
  if (typeof paymentsJson === "number") return paymentsJson;

  if (Array.isArray(paymentsJson)) {
    return paymentsJson.reduce((sum, item) => {
      if (typeof item === "number") return sum + item;
      if (typeof item === "object" && item !== null) {
        const val = Number(item.value ?? item.amount ?? item.payment_amount ?? 0);
        return sum + (isNaN(val) ? 0 : val);
      }
      return sum;
    }, 0);
  }

  if (typeof paymentsJson === "object") {
    const val = Number(paymentsJson.value ?? paymentsJson.amount ?? 0);
    return isNaN(val) ? 0 : val;
  }

  return 0;
};

/**
 * Extracts total weight sum from weights JSONB field (gross_weights or tare_weights).
 * Can be an array of numbers [120, 130] or objects [{ weight: 120 }].
 */
export const extractWeightsSum = (weightsJson) => {
  if (!weightsJson) return 0;
  if (typeof weightsJson === "number") return weightsJson;

  if (Array.isArray(weightsJson)) {
    return weightsJson.reduce((sum, item) => {
      const val = typeof item === "number" ? item : Number(item?.weight ?? item?.val ?? 0);
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
  }

  if (typeof weightsJson === "object") {
    const val = Number(weightsJson.weight ?? weightsJson.val ?? 0);
    return isNaN(val) ? 0 : val;
  }

  return 0;
};

/**
 * Extracts deaths detail object from JSONB deaths field in Events table.
 * Standard format: { count: 10, notes: "...", cause: "..." } or number
 */
export const extractDeathsDetail = (deathsJson) => {
  if (deathsJson === null || deathsJson === undefined) {
    return { count: 0, notes: "", raw: deathsJson };
  }

  if (typeof deathsJson === "number") {
    return { count: deathsJson, notes: "", raw: deathsJson };
  }

  if (typeof deathsJson === "string") {
    const parsed = Number(deathsJson);
    if (!isNaN(parsed)) {
      return { count: parsed, notes: "", raw: deathsJson };
    }
    return { count: 0, notes: deathsJson, raw: deathsJson };
  }

  if (Array.isArray(deathsJson)) {
    const totalCount = deathsJson.reduce((sum, d) => sum + extractDeathsDetail(d).count, 0);
    return { count: totalCount, notes: "Multiple death logs", raw: deathsJson };
  }

  if (typeof deathsJson === "object") {
    const count = Number(deathsJson.count ?? deathsJson.number ?? deathsJson.deaths_count ?? deathsJson.value ?? 0);
    const notes = deathsJson.notes ?? deathsJson.reason ?? deathsJson.description ?? "";
    return { count: isNaN(count) ? 0 : count, notes, raw: deathsJson };
  }

  return { count: 0, notes: "", raw: deathsJson };
};
