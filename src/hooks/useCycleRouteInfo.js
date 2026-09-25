import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCycles } from "../context/CycleContext";
import { parseCycleRoute } from "../utils/routeHelpers";

export const useCycleRouteInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const { selectCycleByRef, selectedCycle, activeCycle, loading, error, notFound } = useCycles();

  const routeInfo = parseCycleRoute(location.pathname, params);
  const { cycleRef, isCurrentCycle, isHistorical, basePath, displayTitle: displayCycleTitle, tab } = routeInfo;

  useEffect(() => {
    selectCycleByRef(cycleRef);
  }, [cycleRef, selectCycleByRef]);

  // If URL references a cycle ID (e.g. /cycle-13) that is actually the active cycle, redirect to /current-cycle
  useEffect(() => {
    if (isHistorical && activeCycle && cycleRef) {
      const isActiveMatch =
        String(activeCycle.id) === String(cycleRef)

      if (isActiveMatch) {
        const targetPath = tab ? `/current-cycle/${tab}` : "/current-cycle";
        navigate(targetPath, { replace: true });
      }
    }
  }, [isHistorical, activeCycle, cycleRef, tab, navigate]);

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
