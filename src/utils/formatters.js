export const formatCompact = (val, unit = "") => {
  if (val == null || isNaN(val)) return { compact: "—", full: "غير متوفر" };
  const num = Number(val);
  const isNeg = num < 0;
  const abs = Math.abs(num);

  let compact = "";
  if (abs >= 1_000_000) {
    compact = `${(abs / 1_000_000).toFixed(1)}M`;
  } else if (abs >= 10_000) {
    compact = `${(abs / 1_000).toFixed(1)}K`;
  } else if (abs >= 1_000) {
    compact = `${(abs / 1_000).toFixed(1)}K`;
  } else {
    compact = `${Number(abs.toFixed(2))}`;
  }

  if (isNeg) compact = `-${compact}`;
  const full = `${num.toLocaleString("ar-EG")} ${unit}`.trim();
  const compactWithUnit = unit ? `${compact} ${unit}`.trim() : compact;

  return { compact: compactWithUnit, full, raw: num };
};

export const formatExactOrCompact = formatCompact;

export const getFcrStatus = (fcr) => {
  if (fcr == null) return { color: "#9CA3AF", label: "غير متوفر", level: "unknown" };
  if (fcr <= 1.6) return { color: "#10B981", label: "ممتاز (≤ 1.6)", level: "good" };
  if (fcr <= 1.8) return { color: "#F59E0B", label: "متوسط (1.61 - 1.8)", level: "warning" };
  return { color: "#EF4444", label: "مرتفع (> 1.8)", level: "danger" };
};
