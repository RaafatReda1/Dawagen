import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchActiveCycle, fetchCyclesList, createNewCycle } from "../Services/cycleService";

const CycleContext = createContext(null);

export const CycleProvider = ({ children }) => {
  const [activeCycle, setActiveCycle] = useState(null);
  const [cyclesList, setCyclesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const refreshCycles = useCallback(async () => {
    try {
      setLoading(true);
      const [active, list] = await Promise.all([
        fetchActiveCycle(),
        fetchCyclesList(),
      ]);
      setActiveCycle(active);
      setCyclesList(list);
    } catch (err) {
      console.error("Failed to load cycles:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCycles();
  }, [refreshCycles]);

  const handleCreateCycle = async (formData) => {
    const created = await createNewCycle(formData);
    await refreshCycles();
    setIsModalOpen(false);
    return created;
  };

  const openNewModal = () => setIsModalOpen(true);
  const closeNewModal = () => setIsModalOpen(false);

  return (
    <CycleContext.Provider
      value={{
        activeCycle,
        cyclesList,
        loading,
        isModalOpen,
        openNewModal,
        closeNewModal,
        createCycle: handleCreateCycle,
        refreshCycles,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};

export const useCycles = () => useContext(CycleContext);
export default CycleContext;
