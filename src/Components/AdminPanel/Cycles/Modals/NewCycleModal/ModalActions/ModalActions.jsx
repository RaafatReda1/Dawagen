import { Loader2, Check } from "lucide-react";
import styles from "./ModalActions.module.css";

const ModalActions = ({ onCancel, submitting }) => {
  return (
    <div className={styles.actionsRow}>
      <button type="button" className={styles.cancelBtn} onClick={onCancel} disabled={submitting}>
        إلغاء
      </button>
      <button type="submit" className={styles.submitBtn} disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 size={18} className={styles.spinner} />
            <span>جاري إنشاء الدورة...</span>
          </>
        ) : (
          <>
            <Check size={18} />
            <span>تأكيد وبدء الدورة</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ModalActions;
