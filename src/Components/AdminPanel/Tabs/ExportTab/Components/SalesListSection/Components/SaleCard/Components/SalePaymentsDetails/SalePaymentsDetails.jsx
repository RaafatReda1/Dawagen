import { CreditCard, Edit3 } from "lucide-react";
import styles from "./SalePaymentsDetails.module.css";

const SalePaymentsDetails = ({ payments = [], onEdit }) => (
  <div className={styles.wrapper}>
    <div className={styles.header}>
      <div className={styles.titleRow}>
        <CreditCard size={15} className={styles.icon} />
        <h4>سجل دفعات التحصيل ({payments.length} دفعة)</h4>
      </div>
      <button type="button" className={styles.editBtn} onClick={onEdit}>
        <Edit3 size={14} />
        <span>متابعة تسجيل الأوزان أو الدفعات</span>
      </button>
    </div>

    <div className={styles.list}>
      {payments.length === 0 ? (
        <span className={styles.empty}>لم يتم تسجيل أي دفعات نقدية أو إلكترونية لهذه الشحنة.</span>
      ) : (
        payments.map((p, idx) => (
          <div key={idx} className={styles.paymentItem}>
            <span className={styles.type}>
              {p.type === "cash" ? "نقداً (كاش)" : p.type === "istapay" || p.type === "instapay" ? "إنستاباي" : p.type === "vodafonecash" ? "فودافون كاش" : p.type || "دفعة"}
            </span>
            <span className={styles.amount}>{(Number(p.amount) || 0).toLocaleString()} ج.م</span>
            {p.date && <span className={styles.date}>{p.date}</span>}
          </div>
        ))
      )}
    </div>
  </div>
);

export default SalePaymentsDetails;
