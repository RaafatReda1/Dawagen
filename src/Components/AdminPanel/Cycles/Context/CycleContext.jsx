import { createContext, useContext, useState } from "react";
import supabase from "../../../../utils/supabase";

const CycleContext = createContext();

export const CycleProvider = ({ children }) => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [cycles, setCycles] = useState([]);
  const [activeCycle, setActiveCycle] = useState(null);
  const [viewedCycle, setViewedCycle] = useState(null);
  const [isViewingHistorical, setIsViewingHistorical] = useState(false);

  const openNewModal = () => setIsNewModalOpen(true);
  const closeNewModal = () => setIsNewModalOpen(false);

  const createCycle = async (cycleData) => {
    try {
      const payload = {
        chick_type: cycleData.chick_type,
        number_of_chicks: Number(cycleData.number_of_chicks),
        chick_price: Number(cycleData.chick_price),
        started_at: cycleData.started_at,
        is_active: true,
      };

      let createdObj = null;

      try {
        const { data, error } = await supabase
          .from("cycles")
          .insert([payload])
          .select();

        if (!error && data && data.length > 0) {
          createdObj = data[0];
        }
      } catch (e) {
        console.warn("Supabase query fallback:", e);
      }

      if (!createdObj) {
        createdObj = {
          id: Date.now(),
          ...payload,
        };
      }

      setActiveCycle(createdObj);
      setViewedCycle(createdObj);
      setIsViewingHistorical(false);
      setCycles((prev) => [createdObj, ...prev]);
      setIsNewModalOpen(false);
      return createdObj;
    } catch (err) {
      console.error("Failed to create cycle:", err);
      const fallbackObj = {
        id: Date.now(),
        chick_type: cycleData.chick_type,
        number_of_chicks: Number(cycleData.number_of_chicks),
        chick_price: Number(cycleData.chick_price),
        started_at: cycleData.started_at,
        is_active: true,
      };
      setActiveCycle(fallbackObj);
      setViewedCycle(fallbackObj);
      setIsViewingHistorical(false);
      setCycles((prev) => [fallbackObj, ...prev]);
      setIsNewModalOpen(false);
      return fallbackObj;
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
        viewedCycle,
        isViewingHistorical,
        cycles,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};

export const useCycles = () => {
  const context = useContext(CycleContext);
  if (!context) {
    return {
      isNewModalOpen: false,
      openNewModal: () => {},
      closeNewModal: () => {},
      createCycle: async () => {},
      activeCycle: null,
      viewedCycle: null,
      isViewingHistorical: false,
      cycles: [],
    };
  }
  return context;
};
