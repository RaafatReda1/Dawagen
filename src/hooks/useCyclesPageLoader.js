import { useState, useEffect, useCallback } from "react";
import { fetchAllCycles } from "../services/cycleService";
import { fetchFullCycleRawData, calculateCycleMetrics } from "../services/cycleOperations";

/**
 * Non-blocking batch loader hook for /cycles route.
 * Fetches and calculates every detail for all cycles while keeping the browser thread responsive.
 */
export const useCyclesPageLoader = () => {
  const [cycles, setCycles] = useState([]);
  const [allMetricsMap, setAllMetricsMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [stepMessage, setStepMessage] = useState("جاري الاتصال بقاعدة البيانات...");

  const yieldThread = () => new Promise((res) => setTimeout(res, 25));

  const loadAllCyclesData = useCallback(async () => {
    setIsLoading(true);
    setProgress(5);
    setStepMessage("جاري الاتصال بقاعدة البيانات والتحقق من الجلسة...");
    await yieldThread();

    try {
      setStepMessage("جاري جلب قائمة كافة الدورات المسجلة في المزرعة...");
      setProgress(15);
      const cyclesList = await fetchAllCycles();
      setCycles(cyclesList);
      await yieldThread();

      if (!cyclesList || cyclesList.length === 0) {
        setProgress(100);
        setStepMessage("لا توجد دورات مسجلة حالياً.");
        setIsLoading(false);
        return;
      }

      const metricsMap = {};
      const totalCycles = cyclesList.length;

      for (let i = 0; i < totalCycles; i++) {
        const cycle = cyclesList[i];
        const currentProgress = Math.round(20 + ((i + 1) / totalCycles) * 60);

        setStepMessage(`جاري تحميل وقراءة سجلات ومبيعات الدورة رقم ${cycle.id}...`);
        setProgress(currentProgress);
        await yieldThread();

        const raw = await fetchFullCycleRawData(cycle.id);
        if (raw) {
          setStepMessage(`جاري حساب المعاملات والمدفوعات المالية للدورة رقم ${cycle.id}...`);
          await yieldThread();
          const calculated = calculateCycleMetrics(raw);
          metricsMap[cycle.id] = calculated;
        }
      }

      setProgress(90);
      setStepMessage("جاري تجهيز وتجميع المؤشرات النهائية للواجهة...");
      await yieldThread();

      setAllMetricsMap(metricsMap);
      setProgress(100);
      setStepMessage("اكتمل التحميل بنجاح! جاري عرض الدورات...");
      await yieldThread();

      setIsLoading(false);
    } catch (err) {
      console.error("Error batch loading cycles data:", err);
      setStepMessage("حدث خطأ أثناء تحميل بيانات الدورات.");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllCyclesData();
  }, [loadAllCyclesData]);

  return {
    isLoading,
    progress,
    stepMessage,
    cycles,
    allMetricsMap,
    refetch: loadAllCyclesData,
  };
};

export default useCyclesPageLoader;
