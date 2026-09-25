import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useCycles } from "../context/CycleContext";
import { parseCycleRoute } from "../utils/routeHelpers";

export const useCycleRouteInfo = () => {
  const location = useLocation();
  const params = useParams();
  const { selectCycleByRef, selectedCycle, activeCycle, loading, error, notFound } = useCycles();

  const routeInfo = parseCycleRoute(location.pathname, params);
  const { cycleRef, isCurrentCycle, isHistorical, basePath, displayTitle: displayCycleTitle } = routeInfo;

  useEffect(() => {
    selectCycleByRef(cycleRef);
  }, [cycleRef, selectCycleByRef]);

  const cycleData = isCurrentCycle ? activeCycle : selectedCycle;

  return {
    isCurrentCycle,
    isViewingHistorical: isHistorical,
    cycleId: cycleRef || activeCycle?.id || null,
    cycleIdFromUrl: cycleRef,
    displayCycleTitle,
    cycleData,
    loading,
    error,
    notFound,
    basePath,
  };
};

export default useCycleRouteInfo;
