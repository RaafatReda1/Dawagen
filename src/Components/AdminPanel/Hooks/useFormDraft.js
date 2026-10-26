import { useState, useEffect, useCallback } from "react";

export const useFormDraft = ({ draftKey, initialState, form, setForm, onClose, notify }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!draftKey) return;
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        setForm(JSON.parse(saved));
        if (notify) notify("تم استرجاع المسودة السابقة المحفوظة");
      }
    } catch {}
  }, [draftKey]);

  const isDirty = useCallback(() => JSON.stringify(form) !== JSON.stringify(initialState), [form, initialState]);

  const requestClose = () => (isDirty() ? setShowConfirm(true) : onClose());

  const saveDraft = () => {
    try {
      localStorage.setItem(draftKey, JSON.stringify(form));
      if (notify) notify("تم حفظ المسودة بنجاح");
    } catch {}
    setShowConfirm(false);
    onClose();
  };

  const discardAndClose = () => {
    try { localStorage.removeItem(draftKey); } catch {}
    setForm(initialState);
    setShowConfirm(false);
    onClose();
  };

  const clearDraft = () => {
    try { localStorage.removeItem(draftKey); } catch {}
  };

  return { showConfirm, requestClose, saveDraft, discardAndClose, cancelClose: () => setShowConfirm(false), clearDraft };
};
