export const getWeightVal = (w) => (typeof w === "object" && w !== null ? Number(w.weight) || 0 : Number(w) || 0);

export const calculateTareTotal = (tareWeights = []) =>
  (tareWeights || []).reduce((acc, w) => acc + getWeightVal(w), 0);

export const calculateGrossTotal = (grossWeights = []) =>
  (grossWeights || []).reduce((acc, w) => acc + getWeightVal(w), 0);

export const calculateNetWeight = (grossTotal, tareTotal) =>
  Math.max(0, grossTotal - tareTotal);

export const calculateSaleTotal = (netWeight, executionPrice) =>
  netWeight * (Number(executionPrice) || 0);

export const calculatePaymentsTotal = (payments = []) =>
  (payments || []).reduce((acc, p) => acc + (Number(p.amount) || 0), 0);

export const calculateRemaining = (totalPrice, paidTotal) =>
  Math.max(0, totalPrice - paidTotal);

export const formatDateDisplay = (dateStr) => {
  if (!dateStr) return new Date().toLocaleDateString("ar-EG");
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString("ar-EG");
};
