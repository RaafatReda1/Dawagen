import { Trash2 } from "lucide-react";
import styles from "./PaymentsHistory.module.css";

const PaymentsHistory = ({ payments = [], onRemovePayment, isReadOnly }) => {
  if (payments.length === 0) {
    return <div className={styles.empty}>لم يتم تسجيل أي دفعات نقدية أو بنكية لهذه الشحنة حتى الآن.</div>;
  }

  return (
    <div className={styles.list}>
      {payments.map((p, idx) => (
        <div key={idx} className={styles.item}>
          <div className={styles.info}>
            <strong className={styles.amount}>{Number(p.amount).toLocaleString()} ج.م</strong>
            <span className={styles.method}>({p.method || "نقدي"})</span>
            {p.note && <span className={styles.note}>{p.note}</span>}
            <span className={styles.date}>{p.date}</span>
          </div>
          {!isReadOnly && (
            <button type="button" className={styles.delBtn} onClick={() => onRemovePayment(idx)} aria-label="حذف الدفعة">
              <Trash2 size={14} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PaymentsHistory;
