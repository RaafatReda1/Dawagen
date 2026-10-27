export const getWeightVal = (w) =>
  typeof w === "object" && w !== null ? Number(w.weight) || 0 : Number(w) || 0;

export const getChicksVal = (w, defaultCapacity = 10) => {
  if (typeof w !== "object" || w === null) return 0;
  if (w.chicks_count !== undefined && w.chicks_count !== null && w.chicks_count !== "") {
    return Number(w.chicks_count) || 0;
  }
  const crates = Number(w.crates_count) || 1;
  return crates * (Number(defaultCapacity) || 10);
};

export const calculateGrossChicksTotal = (grossWeights = [], capacity = 10) =>
  (grossWeights || []).reduce((acc, w) => acc + getChicksVal(w, capacity), 0);

export const calculateAvgBirdWeight = (netWeight, totalBirds) =>
  totalBirds > 0 ? Number((netWeight / totalBirds).toFixed(3)) : 0;
