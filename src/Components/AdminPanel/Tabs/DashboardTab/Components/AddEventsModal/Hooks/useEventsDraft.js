import { useState, useEffect, useCallback } from "react";

export const useEventsDraft = ({ day, cycleId, generalInfo, setGeneralInfo, tabForms, setTabForms, onClose, notify }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const draftKey = `draft_events_c${cycleId}_d${day?.day_number}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        const d = JSON.parse(saved);
        if (d.generalInfo) setGeneralInfo(d.generalInfo);
        if (d.tabForms) setTabForms(d.tabForms);
        if (notify) notify("تم استرجاع مسودة أحداث هذا اليوم");
      }
    } catch {}
  }, [draftKey]);

  const isDirty = useCallback(() => {
    const hasGen = Boolean(generalInfo.temperature || generalInfo.deaths || generalInfo.deathReason);
    const hasExp = Boolean(tabForms?.expenses?.expense_item || (tabForms?.expenses?.amount && tabForms?.expenses?.amount !== "0"));
    const hasFeed = Boolean(tabForms?.feed?.sacks_consumed);
    const hasDrug = Boolean(tabForms?.drugs?.drug_id || tabForms?.drugs?.packages_count);
    const hasMeta = Boolean(tabForms?.meta?.name || tabForms?.meta?.weights?.sample);
    return hasGen || hasExp || hasFeed || hasDrug || hasMeta;
  }, [generalInfo, tabForms]);

  const requestClose = () => (isDirty() ? setShowConfirm(true) : onClose());
  const saveDraft = () => {
    try {
      localStorage.setItem(draftKey, JSON.stringify({ generalInfo, tabForms }));
      if (notify) notify("تم حفظ مسودة أحداث اليوم بنجاح");
    } catch {}
    setShowConfirm(false);
    onClose();
  };
  const discardAndClose = () => {
    try { localStorage.removeItem(draftKey); } catch {}
    setShowConfirm(false);
    onClose();
  };

  return {
    showConfirm, requestClose, saveDraft, discardAndClose,
    cancelClose: () => setShowConfirm(false),
    clearDraft: () => { try { localStorage.removeItem(draftKey); } catch {} },
  };
};
