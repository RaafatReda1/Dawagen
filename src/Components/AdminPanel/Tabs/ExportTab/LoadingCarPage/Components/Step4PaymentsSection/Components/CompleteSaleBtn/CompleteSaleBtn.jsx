import { CheckCircle2 } from "lucide-react";
import styles from "./CompleteSaleBtn.module.css";

const CompleteSaleBtn = ({ onComplete, isReadOnly, isSubmitting }) => (
  <button
    type="button"
    className={styles.btn}
    onClick={onComplete}
    disabled={isReadOnly || isSubmitting}
  >
    <CheckCircle2 size={16} />
    <span>{isSubmitting ? "جاري إنهاء وتأكيد الشحنة..." : "إنهاء وتأكيد تحميل السيارة"}</span>
  </button>
);

export default CompleteSaleBtn;
