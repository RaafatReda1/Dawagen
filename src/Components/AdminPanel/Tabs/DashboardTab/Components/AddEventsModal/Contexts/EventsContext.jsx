import { createContext, useContext, useState } from "react";
import { useFormDraft } from "../../../../../Hooks/useFormDraft";

const EventsContext = createContext(null);
const INITIAL_GEN = { temperature: "", deaths: "", deathReason: "" };

export const EventsProvider = ({ children, day, cycleId, user, rawData, refetch, onClose }) => {
  const [activeTab, setActiveTab] = useState("expenses");
  const [generalInfo, setGeneralInfo] = useState(INITIAL_GEN);
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const notify = (msg, type = "success") => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const draft = useFormDraft({
    draftKey: day?.id ? `draft_events_${day.id}` : null,
    initialState: INITIAL_GEN, form: generalInfo, setForm: setGeneralInfo, onClose, notify,
  });

  const value = {
    day, cycleId, user, rawData, refetch, onClose, draft,
    requestClose: draft.requestClose, showConfirm: draft.showConfirm,
    saveDraft: draft.saveDraft, discardAndClose: draft.discardAndClose,
    cancelClose: draft.cancelClose, clearDraft: draft.clearDraft,
    activeTab, setActiveTab, generalInfo, setGeneralInfo, notification, notify, isSubmitting, setIsSubmitting,
  };

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
};

export const useEvents = () => useContext(EventsContext);
export default EventsContext;
