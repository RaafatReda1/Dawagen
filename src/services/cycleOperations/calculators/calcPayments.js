export { extractDeathsDetail } from "./extractDeathsDetail";

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
