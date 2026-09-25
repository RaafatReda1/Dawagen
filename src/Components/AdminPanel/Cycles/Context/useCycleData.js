// import { useState, useEffect, useCallback } from "react";
// import { fetchActiveCycle, fetchAllCyclesWithMetrics, createNewCycle } from "../Services/cycleService";

// export const useCycleData = () => {
//   const [activeCycle, setActiveCycle] = useState(null);
//   const [cyclesWithMetrics, setCyclesWithMetrics] = useState([]);
//   const [viewedCycleId, setViewedCycleId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadingStep, setLoadingStep] = useState(1);
//   const [stepMessage, setStepMessage] = useState("جاري جلب سجلات المزرعة...");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const refreshCycles = useCallback(async () => {
//     try {
//       setLoading(true);
//       setLoadingStep(1); setStepMessage("جاري استرجاع سجلات الدورات والفواتير...");
//       const active = await fetchActiveCycle();
//       setActiveCycle(active);

//       setLoadingStep(2); setStepMessage("جاري معالجة مبيعات وتغذية القطعان...");
//       const allWithMetrics = await fetchAllCyclesWithMetrics();

//       setLoadingStep(3); setStepMessage("جاري إنهاء الحسابات البيولوجية والمالية...");
//       setCyclesWithMetrics(allWithMetrics);
//     } catch (err) {
//       console.error("Failed to load cycles:", err);
//     } finally { setLoading(false); }
//   }, []);

//   useEffect(() => { refreshCycles(); }, [refreshCycles]);

//   const handleCreate = async (formData) => {
//     const created = await createNewCycle(formData);
//     await refreshCycles();
//     setIsModalOpen(false);
//     return created;
//   };

//   const viewedCycleData = viewedCycleId
//     ? cyclesWithMetrics.find(c => String(c.cycle.id) === String(viewedCycleId))
//     : (activeCycle ? cyclesWithMetrics.find(c => String(c.cycle.id) === String(activeCycle.id)) : null);

//   return {
//     activeCycle, cyclesWithMetrics, viewedCycle: viewedCycleData?.cycle || (viewedCycleId ? null : activeCycle),
//     viewedCycleData, viewedCycleId, setViewedCycleId, isViewingHistorical: viewedCycleData ? !viewedCycleData.cycle.is_active : false,
//     loading, loadingStep, stepMessage, isModalOpen, openNewModal: () => setIsModalOpen(true),
//     closeNewModal: () => setIsModalOpen(false), createCycle: handleCreate, refreshCycles
//   };
// };
