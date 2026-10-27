import { useState, useCallback, useRef } from "react";
import { loadSessionLocal } from "../Utils/loadingStorageHelpers";

export const useReconciliation = (cycleId, saleId) => {
  const [conflictData, setConflictData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const checkedRef = useRef(false);

  const checkConflict = useCallback((server) => {
    if (checkedRef.current || !cycleId || !server?.id) return;
    checkedRef.current = true;
    const local = loadSessionLocal(cycleId, server.id);
    if (!local || !local.updatedAt) return;

    const tareDiff = (local.tareWeights?.length || 0) !== (server.tare_weights?.length || 0);
    const grossDiff = (local.grossWeights?.length || 0) !== (server.gross_weights?.length || 0);
    const priceDiff = Number(local.form?.execution_price || 0) !== Number(server.execution_price || 0);

    if (tareDiff || grossDiff || priceDiff) {
      setConflictData({ local, server });
      setIsModalOpen(true);
    }
  }, [cycleId, saleId]);

  const dismiss = () => {
    setConflictData(null);
    setIsModalOpen(false);
  };

  return { conflictData, isModalOpen, checkConflict, dismiss };
};

export default useReconciliation;
