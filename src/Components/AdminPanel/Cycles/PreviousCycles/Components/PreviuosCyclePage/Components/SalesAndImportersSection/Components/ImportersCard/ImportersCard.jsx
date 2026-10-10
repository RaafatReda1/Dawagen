import React, { useMemo } from "react";
import { Users } from "lucide-react";
import styles from "./ImportersCard.module.css";

const ImportersCard = ({ importers = [] }) => {
  const count = importers.length;
  const { visible, remaining, tooltip } = useMemo(() => {
    const names = importers
      .map((imp) => imp?.importerInfo?.name || imp?.name || (imp?.importer_id ? `تاجر #${imp.importer_id}` : ""))
      .filter(Boolean);
    return {
      visible: names.slice(0, 2),
      remaining: Math.max(0, names.length - 2),
      tooltip: names.join(" • "),
    };
  }, [importers]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <Users size={18} className={styles.icon} />
          <span>شبكة التجّار والموزعين</span>
        </div>
        <span className={styles.badge}>{count} {count === 1 ? "تاجر" : "تجار"}</span>
      </div>
      <div className={styles.countBlock}>
        <div className={styles.bigCount}>
          {count} <span className={styles.unit}>{count === 1 ? "تاجر معتمد" : "تجار معتمدين"}</span>
        </div>
      </div>
      <div className={styles.chipsContainer} title={tooltip || "قائمة التجار"}>
        {visible.length > 0 ? (
          <>
            {visible.map((name, i) => (
              <span key={i} className={styles.chip} title={name}>{name}</span>
            ))}
            {remaining > 0 && (
              <span className={styles.remainingChip} title={tooltip}>+{remaining} آخرين</span>
            )}
          </>
        ) : (
          <span className={styles.empty}>لا يوجد تجار مسجلين</span>
        )}
      </div>
    </div>
  );
};

export default ImportersCard;
