// THIS FILE HANDLES ROUTE LOGIC I MEAN IN THE END IT TELLS U WHAT THE URL NEEDS
export const parseCycleRoute = (pathname = "", params = {}) => {
  let cycleRef = params.id || params.cycleSlug || null;

  if (!cycleRef) {
    const match = pathname.match(
      /^\/(?:current-([^\/]+)|cycle-([^\/]+)|cycles\/([^\/]+)|cycle\/([^\/]+))/i
    );
    if (match) {
      cycleRef = match[1] || match[2] || match[3] || match[4];
    }
  }

  if (typeof cycleRef === "string") {
    const cleaned = cycleRef.replace(/^(current-|cycle-|cycles-)/i, "").trim();
    if (!cleaned || cleaned === "current" || cleaned === "cycle" || cleaned === "cycles") {
      cycleRef = null;
    } else {
      cycleRef = cleaned;
    }
  }

  const parts = pathname.split("/").filter(Boolean);
  const lastPart = parts[parts.length - 1];
  const knownTabs = ["feed", "drugs", "export", "overview"];
  const tab = knownTabs.includes(lastPart) ? lastPart : "";

  const isCurrentCycle =
    pathname.startsWith("/current-cycle") ||
    (!cycleRef && !pathname.startsWith("/cycles") && !pathname.startsWith("/analytics"));
  const isHistorical = !isCurrentCycle && Boolean(cycleRef);
  const basePath = isHistorical ? `/cycle-${cycleRef}` : "/current-cycle";

  return {
    cycleRef,
    isCurrentCycle,
    isHistorical,
    basePath,
    tab,
    displayTitle: isHistorical ? `دورة #${cycleRef}` : "الدورة الحالية",
  };
};

export const buildCyclePath = (cycleRef, tab = "") => {
  const base = cycleRef && cycleRef !== "current" ? `/cycle-${cycleRef}` : "/current-cycle";
  return tab ? `${base}/${tab}` : base;
};
