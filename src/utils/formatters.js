export const formatEgp = (val, { showSign = false, compact = true } = {}) => {
  if (val == null || isNaN(val)) return "0 EGP";
  const num = Number(val);
  if (num === 0) return "0 EGP";

  const isNeg = num < 0;
  const abs = Math.abs(num);

  let formatted = "";

  if (compact) {
    if (abs >= 1_000_000) {
      formatted = `${(abs / 1_000_000).toFixed(1)}M`;
    } else if (abs >= 1_000) {
      formatted = `${(abs / 1_000).toFixed(1)}K`;
    } else {
      formatted = `${Math.round(abs).toLocaleString()}`;
    }
  } else {
    formatted = `${Math.round(abs).toLocaleString()}`;
  }

  // Remove trailing .0 before K/M (e.g. 30.0K -> 30K)
  formatted = formatted.replace(/\.0([KM])/, "$1");

  let sign = "";
  if (isNeg) {
    sign = "-";
  } else if (showSign && num > 0) {
    sign = "+";
  }

  return `${sign}${formatted} EGP`;
};

export const formatCompact = (val, unit = "") => {
  if (val == null || isNaN(val)) return { compact: "—", full: "غير متوفر" };
  const num = Number(val);
  const isNeg = num < 0;
  const abs = Math.abs(num);

  let compact = "";
  if (abs >= 1_000_000) {
    compact = `${(abs / 1_000_000).toFixed(1)}M`;
  } else if (abs >= 1_000) {
    compact = `${(abs / 1_000).toFixed(1)}K`;
  } else {
    compact = `${Math.round(abs)}`;
  }

  compact = compact.replace(/\.0([KM])/, "$1");

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
