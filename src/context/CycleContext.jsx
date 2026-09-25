import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchActiveCycle, fetchAllCycles, fetchCycleById, createCycleInDb } from "../services/cycleService";

const CycleContext = createContext();

export const CycleProvider = ({ children }) => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [cycles, setCycles] = useState([]);
  const [activeCycle, setActiveCycle] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const openNewModal = () => setIsNewModalOpen(true);
  const closeNewModal = () => setIsNewModalOpen(false);

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
    } catch (err) {
      setError(err.message || "فشل في تحميل بيانات الدورات");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const selectCycleByRef = useCallback(
    async (cycleRef) => {
      setNotFound(false);
      setError(null);
      if (!cycleRef) {
        setSelectedCycle(activeCycle);
        return activeCycle;
      }

      const match = cycles.find(
        (c) => String(c.id) === String(cycleRef) || String(c.cycle_number) === String(cycleRef)
      );
      if (match) {
        setSelectedCycle(match);
        return match;
      }

      try {
        const fetched = await fetchCycleById(cycleRef);
        if (fetched) {
          setSelectedCycle(fetched);
          return fetched;
        } else {
          setSelectedCycle(null);
          setNotFound(true);
          setError(`الدورة رقم #${cycleRef} غير مسجلة بالنظام.`);
          return null;
        }
      } catch (err) {
        console.error(`Failed to fetch cycle #${cycleRef}:`, err);
        setSelectedCycle(null);
        setNotFound(true);
        setError(`خطأ أثناء جلب بيانات الدورة #${cycleRef}`);
        return null;
      }
    },
    [activeCycle, cycles]
  );

  const createCycle = async (cycleData) => {
    setError(null);
    try {
      const created = await createCycleInDb(cycleData);
      setActiveCycle(created);
      setSelectedCycle(created);
      setCycles((prev) => [created, ...prev]);
      setIsNewModalOpen(false);
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
        cycles,
        loading,
        error,
        notFound,
        selectCycleByRef,
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
