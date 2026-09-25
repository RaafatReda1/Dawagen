import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchActiveCycle, fetchAllCycles, fetchCycleById, createCycleInDb } from "../services/cycleService";
import { fetchFullCycleRawData, calculateCycleMetrics } from "../services/cycleOperations";

const CycleContext = createContext();

export const CycleProvider = ({ children }) => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [cycles, setCycles] = useState([]);
  const [activeCycle, setActiveCycle] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState(null);

  // Deep cycle details stored in context
  const [rawCycleData, setRawCycleData] = useState(null);
  const [cycleMetrics, setCycleMetrics] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const openNewModal = () => setIsNewModalOpen(true);
  const closeNewModal = () => setIsNewModalOpen(false);

  // Load deep full raw data for all tables of a cycle and calculate metrics
  const loadCycleFullDetails = useCallback(async (targetCycleId) => {
    if (!targetCycleId) {
      setRawCycleData(null);
      setCycleMetrics(null);
      return null;
    }

    setLoadingDetails(true);
    try {
      const raw = await fetchFullCycleRawData(targetCycleId);
      if (raw) {
        const calculated = calculateCycleMetrics(raw);
        setRawCycleData(raw);
        setCycleMetrics(calculated);
        return { raw, calculated };
      } else {
        setRawCycleData(null);
        setCycleMetrics(null);
        return null;
      }
    } catch (err) {
      console.error(`Failed to load full cycle details for #${targetCycleId}:`, err);
      setRawCycleData(null);
      setCycleMetrics(null);
      return null;
    } finally {
      setLoadingDetails(false);
    }
  }, []);

  const loadInitialData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [active, allList] = await Promise.all([
        fetchActiveCycle().catch((e) => { console.warn("Active cycle error:", e); return null; }),
        fetchAllCycles().catch((e) => { console.warn("Cycles list error:", e); return []; }),
      ]);
      setActiveCycle(active);
      setCycles(allList);

      if (active?.id) {
        setSelectedCycle(active);
        await loadCycleFullDetails(active.id);
      }
    } catch (err) {
      setError(err.message || "فشل في تحميل بيانات الدورات");
    } finally {
      setLoading(false);
    }
  }, [loadCycleFullDetails]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const selectCycleByRef = useCallback(
    async (cycleRef) => {
      setNotFound(false);
      setError(null);
      if (!cycleRef) {
        setSelectedCycle(activeCycle);
        if (activeCycle?.id) {
          await loadCycleFullDetails(activeCycle.id);
        }
        return activeCycle;
      }

      const match = cycles.find(
        (c) => String(c.id) === String(cycleRef) || String(c.cycle_number) === String(cycleRef)
      );

      if (match) {
        setSelectedCycle(match);
        await loadCycleFullDetails(match.id);
        return match;
      }

      try {
        const fetched = await fetchCycleById(cycleRef);
        if (fetched) {
          setSelectedCycle(fetched);
          await loadCycleFullDetails(fetched.id);
          return fetched;
        } else {
          setSelectedCycle(null);
          setRawCycleData(null);
          setCycleMetrics(null);
          setNotFound(true);
          setError(`الدورة رقم #${cycleRef} غير مسجلة بالنظام.`);
          return null;
        }
      } catch (err) {
        console.error(`Failed to fetch cycle #${cycleRef}:`, err);
        setSelectedCycle(null);
        setRawCycleData(null);
        setCycleMetrics(null);
        setNotFound(true);
        setError(`خطأ أثناء جلب بيانات الدورة #${cycleRef}`);
        return null;
      }
    },
    [activeCycle, cycles, loadCycleFullDetails]
  );

  const createCycle = async (cycleData) => {
    setError(null);
    try {
      const created = await createCycleInDb(cycleData);
      setActiveCycle(created);
      setSelectedCycle(created);
      setCycles((prev) => [created, ...prev]);
      setIsNewModalOpen(false);
      await loadCycleFullDetails(created.id);
      return created;
    } catch (err) {
      console.error("Failed to create cycle in DB:", err);
      setError("تعذر إنشاء الدورة في قاعدة البيانات.");
      throw err;
    }
  };

  return (
    <CycleContext.Provider
      value={{
        isNewModalOpen,
        openNewModal,
        closeNewModal,
        createCycle,
        activeCycle,
        selectedCycle,
        rawCycleData,
        cycleMetrics,
        loadingDetails,
        cycles,
        loading,
        error,
        notFound,
        selectCycleByRef,
        loadCycleFullDetails,
        reloadCycles: loadInitialData,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};

export const useCycles = () => {
  const context = useContext(CycleContext);
  if (!context) {
    throw new Error("useCycles must be used within a CycleProvider");
  }
  return context;
};

export default CycleContext;
