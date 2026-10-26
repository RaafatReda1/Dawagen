import { createContext, useContext, useState } from "react";
import { useEventsDraft } from "../Hooks/useEventsDraft";

const EventsContext = createContext(null);
const INITIAL_GEN = { temperature: "", deaths: "", deathReason: "" };
const INITIAL_TABS = {
  expenses: { expense_item: "", amount: "", payment_type: "cash" },
  feed: { food_id: "", sacks_consumed: "", consumption_type: "consumed" },
  drugs: { drug_id: "", packages_count: "", consumed_capacity: "", disease_id: "" },
  meta: { weights: { small: "", medium: "", large: "", sample: "" }, name: "", value: "" },
};

export const EventsProvider = ({ children, day, cycleId, user, rawData, refetch, onClose }) => {
  const [activeTab, setActiveTab] = useState("expenses");
  const [generalInfo, setGeneralInfo] = useState(INITIAL_GEN);
  const [tabForms, setTabForms] = useState(INITIAL_TABS);
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const notify = (msg, type = "success") => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const draft = useEventsDraft({
    day, cycleId, generalInfo, setGeneralInfo, tabForms, setTabForms, onClose, notify,
  });

  const value = {
    day, cycleId, user, rawData, refetch, onClose, draft,
    requestClose: draft.requestClose, showConfirm: draft.showConfirm,
    saveDraft: draft.saveDraft, discardAndClose: draft.discardAndClose,
    cancelClose: draft.cancelClose, clearDraft: draft.clearDraft,
    activeTab, setActiveTab, generalInfo, setGeneralInfo,
    tabForms, setTabForms, notification, notify, isSubmitting, setIsSubmitting,
  };

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
};

export const useEvents = () => useContext(EventsContext);
export default EventsContext;
