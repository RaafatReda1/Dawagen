export const extractDeathsDetail = (deathsJson) => {
  if (deathsJson === null || deathsJson === undefined) return { count: 0, notes: "", raw: deathsJson };
  if (typeof deathsJson === "number") return { count: deathsJson, notes: "", raw: deathsJson };
  if (typeof deathsJson === "string") {
    const parsed = Number(deathsJson);
    return isNaN(parsed) ? { count: 0, notes: deathsJson, raw: deathsJson } : { count: parsed, notes: "", raw: deathsJson };
  }
  if (Array.isArray(deathsJson)) {
    const total = deathsJson.reduce((sum, d) => sum + extractDeathsDetail(d).count, 0);
    return { count: total, notes: "Multiple death logs", raw: deathsJson };
  }
  if (typeof deathsJson === "object") {
    const count = Number(deathsJson.count ?? deathsJson.number ?? deathsJson.deaths_count ?? deathsJson.value ?? 0);
    const notes = deathsJson.notes ?? deathsJson.reason ?? deathsJson.description ?? "";
    return { count: isNaN(count) ? 0 : count, notes, raw: deathsJson };
  }
  return { count: 0, notes: "", raw: deathsJson };
};
