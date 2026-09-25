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

  if (cycleRef === "current-cycle" || cycleRef === "current") {
    cycleRef = null;
  } else if (typeof cycleRef === "string") {
    const cleaned = cycleRef.replace(/^(current-|cycle-|cycles-)/i, "");
    if (cleaned && cleaned !== "current" && cleaned !== "cycle") {
      cycleRef = cleaned;
    }
  }

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
    displayTitle: isHistorical ? `دورة #${cycleRef}` : "الدورة الحالية",
  };
};

export const buildCyclePath = (cycleRef, tab = "") => {
  const base = cycleRef && cycleRef !== "current" ? `/cycle-${cycleRef}` : "/current-cycle";
  return tab ? `${base}/${tab}` : base;
};
