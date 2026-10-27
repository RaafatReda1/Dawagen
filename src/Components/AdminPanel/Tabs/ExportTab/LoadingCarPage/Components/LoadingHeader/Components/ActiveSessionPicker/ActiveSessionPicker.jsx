import { useState, useRef, useEffect } from "react";
import { Users, ChevronDown, Plus } from "lucide-react";
import styles from "./ActiveSessionPicker.module.css";

const ActiveSessionPicker = ({ activeLoadings = [], currentSaleId, onSelectSession, onNewSession }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.wrap} ref={ref}>
      <button type="button" className={styles.trigger} onClick={() => setOpen((p) => !p)}>
        <Users size={14} />
        <span>التحميلات الجارية ({activeLoadings.length})</span>
        <ChevronDown size={14} className={open ? styles.rotated : ""} />
      </button>
      {open && (
        <div className={styles.menu}>
          <div className={styles.menuHeader}>التبديل بين شحنات التجار الحالية:</div>
          <div className={styles.list}>
            {activeLoadings.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`${styles.item} ${String(s.id) === String(currentSaleId) ? styles.activeItem : ""}`}
                onClick={() => { onSelectSession(s.id); setOpen(false); }}
              >
                <span className={styles.itemName}>{s.Importers?.name || "تاجر غير مسمى"}</span>
                <span className={styles.itemMeta}>{s.vehicle_type || "سيارة"}</span>
              </button>
            ))}
          </div>
          <button type="button" className={styles.newItemBtn} onClick={() => { onNewSession(); setOpen(false); }}>
            <Plus size={14} /><span>+ بدء تحميل تاجر جديد</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ActiveSessionPicker;
