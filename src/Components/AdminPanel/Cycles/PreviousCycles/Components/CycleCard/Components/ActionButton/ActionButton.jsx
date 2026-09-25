import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import styles from "./ActionButton.module.css";

const ActionButton = ({ cycleId }) => {
  return (
    <Link to={`/cycle-${cycleId}`} className={styles.button}>
      <ArrowLeft size={18} />
      <span>عرض تفاصيل الدورة</span>
    </Link>
  );
};

export default ActionButton;
