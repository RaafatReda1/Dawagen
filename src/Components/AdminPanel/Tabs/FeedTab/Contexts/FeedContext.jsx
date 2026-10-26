import { createContext, useContext, useMemo, useState } from "react";
import { calculateFeedMetrics } from "../Utils/feedCalculations";

const FeedContext = createContext(null);

export const FeedProvider = ({ children, cycleId, cycleData, rawData, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const notify = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const metrics = useMemo(() => {
    return calculateFeedMetrics(rawData?.feedShipments || [], rawData?.foodWithdrawals || []);
  }, [rawData?.feedShipments, rawData?.foodWithdrawals]);

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

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
};

export const useFeed = () => useContext(FeedContext);
export default FeedContext;
