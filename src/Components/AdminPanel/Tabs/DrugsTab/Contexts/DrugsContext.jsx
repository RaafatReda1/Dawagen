import { createContext, useContext, useMemo, useState } from "react";
import { calculateDrugsMetrics } from "../Utils/drugCalculations";

const DrugsContext = createContext(null);

export const DrugsProvider = ({ children, cycleId, cycleData, rawData, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const notify = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const metrics = useMemo(() => {
    return calculateDrugsMetrics(
      rawData?.medicineInvoices || [],
      rawData?.drugWithdrawals || []
    );
  }, [rawData?.medicineInvoices, rawData?.drugWithdrawals]);

  const value = {
    cycleId,
    cycleData,
    rawData,
    refetch,
    metrics,
    isModalOpen,
    setIsModalOpen,
    notification,
    notify,
  };

  return <DrugsContext.Provider value={value}>{children}</DrugsContext.Provider>;
};

export const useDrugs = () => useContext(DrugsContext);
export default DrugsContext;
