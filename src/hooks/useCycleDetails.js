import { useState, useEffect, useCallback } from "react";
import { fetchFullCycleRawData, calculateCycleMetrics } from "../services/cycleOperations";

/**
 * Custom React Hook to load and aggregate complete raw financial & operational metrics
 * for a specific cycle ID.
 */
export const useCycleDetails = (cycleId) => {
  const [rawData, setRawData] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDetails = useCallback(async () => {
    if (!cycleId) {
      setRawData(null);
      setMetrics(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const raw = await fetchFullCycleRawData(cycleId);
      if (!raw) {
        setRawData(null);
        setMetrics(null);
      } else {
        const calculated = calculateCycleMetrics(raw);
        setRawData(raw);
        setMetrics(calculated);
      }
    } catch (err) {
      console.error(`Failed to load details for cycle #${cycleId}:`, err);
      setError(err.message || "فشل في تحميل وتجميع كافة البيانات المالية للدورة");
      setRawData(null);
      setMetrics(null);
    } finally {
      setLoading(false);
    }
  }, [cycleId]);

  useEffect(() => {
    loadDetails();
  }, [loadDetails]);

  return {
    rawData,
    metrics,
    loading,
    error,
    refetch: loadDetails,
  };
};

export default useCycleDetails;
