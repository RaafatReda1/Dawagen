import { useState } from "react";
import { Truck, ArrowLeft, Scale, CheckCircle2, Trash2, Loader2 } from "lucide-react";
import { calculateNetWeight, calculateGrossTotal, calculateTareTotal } from "../../../../Utils";
import styles from "./ActiveLoadingCard.module.css";

const ActiveLoadingCard = ({ sale, onResume, onDelete }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const tare = calculateTareTotal(sale.tare_weights);
  const gross = calculateGrossTotal(sale.gross_weights);
  const net = calculateNetWeight(gross, tare);

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!onDelete) return;
    setIsDeleting(true);
    try {
      await onDelete(sale.id);
    } finally {
      setIsDeleting(false);
      setIsConfirming(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.iconWrap}><Truck size={18} /></div>
        <div className={styles.info}>
          <strong className={styles.name}>{sale.Importers?.name || "تاجر غير مسمى"}</strong>
          <span className={styles.vehicle}>{sale.vehicle_type || "مركبة"}</span>
        </div>
        <span className={styles.badge}>قيد الوزن</span>
      </div>
      <div className={styles.metrics}>
        <div className={styles.metric}>
          <Scale size={13} />
          <span>فارغ: {sale.tare_weights?.length || 0} وزنات</span>
        </div>
        <div className={styles.metric}>
          <CheckCircle2 size={13} />
          <span>قائم: {sale.gross_weights?.length || 0} وزنات</span>
        </div>
        <div className={`${styles.metric} ${styles.net}`}>
          <strong>صافي: {net.toLocaleString()} كجم</strong>
        </div>
      </div>

      {isConfirming ? (
        <div className={styles.confirmBox}>
          <span className={styles.confirmText}>هل تريد بالتأكيد حذف هذه الشحنة؟</span>
          <div className={styles.confirmBtns}>
            <button
              type="button"
              className={styles.confirmDeleteBtn}
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? <Loader2 size={13} className={styles.spin} /> : <Trash2 size={13} />}
              <span>{isDeleting ? "جارٍ الحذف..." : "نعم، حذف"}</span>
            </button>
            <button
              type="button"
              className={styles.cancelDeleteBtn}
              onClick={() => setIsConfirming(false)}
              disabled={isDeleting}
            >
              تراجع
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.actions}>
          <button type="button" className={styles.resumeBtn} onClick={() => onResume(sale)}>
            <span>متابعة التحميل والميزان</span>
            <ArrowLeft size={14} />
          </button>
          {onDelete && (
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={() => setIsConfirming(true)}
              title="حذف شحنة التحميل"
              aria-label="حذف شحنة التحميل"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ActiveLoadingCard;
