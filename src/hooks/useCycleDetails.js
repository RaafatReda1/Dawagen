import { useState, useEffect, useCallback } from "react";
import { fetchFullCycleRawData } from "../services/cycleOperations";

export const useCycleDetails = (cycleId) => {
  const [rawData, setRawData] = useState(null);
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDetails = useCallback(async () => {
    if (!cycleId) {
      setRawData(null);
      setMetrics({});
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const raw = await fetchFullCycleRawData(cycleId);
      setRawData(raw);
      setMetrics(raw?.metrics || {});
    } catch (err) {
      console.error(`Failed to load details for cycle #${cycleId}:`, err);
      setError(err.message || "فشل في تحميل بيانات الدورة");
      setRawData(null);
      setMetrics({});
    } finally {
      setLoading(false);
    }
  }, [cycleId]);

  useEffect(() => {
    loadDetails();
  }, [loadDetails]);

  return { rawData, metrics, loading, error, refetch: loadDetails };
};

export default useCycleDetails;
