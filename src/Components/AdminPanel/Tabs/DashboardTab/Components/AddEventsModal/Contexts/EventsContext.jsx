import { createContext, useContext, useState } from "react";

const EventsContext = createContext(null);

export const EventsProvider = ({ children, day, cycleId, user, rawData, refetch, onClose }) => {
  const [activeTab, setActiveTab] = useState("expenses");
  const [generalInfo, setGeneralInfo] = useState({ temperature: "", deaths: "", deathReason: "" });
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const notify = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const value = {
    day, cycleId, user, rawData, refetch, onClose,
    activeTab, setActiveTab,
    generalInfo, setGeneralInfo,
    notification, notify,
    isSubmitting, setIsSubmitting,
  };

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
};

export const useEvents = () => useContext(EventsContext);
export default EventsContext;
