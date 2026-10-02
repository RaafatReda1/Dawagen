import React from "react";
import { ArrowLeft } from "lucide-react";
import styles from "./ActionButton.module.css";

const ActionButton = ({ cycleId, onSelect }) => {
  return (
    <button onClick={() => onSelect && onSelect(cycleId)} className={styles.button}>
      <ArrowLeft size={18} />
      <span>عرض تفاصيل الدورة</span>
    </button>
  );
};

export default ActionButton;
