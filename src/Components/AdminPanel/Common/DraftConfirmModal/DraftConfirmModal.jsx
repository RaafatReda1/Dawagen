import { AlertCircle, Save, Trash2, ArrowRight } from "lucide-react";
import styles from "./DraftConfirmModal.module.css";

const DraftConfirmModal = ({ isOpen, onSaveDraft, onDiscard, onCancel }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onCancel} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.iconBox}><AlertCircle size={22} /></div>
          <div>
            <h3 className={styles.title}>تعديلات غير محفوظة</h3>
            <p className={styles.desc}>لديك بيانات غير محفوظة في النموذج. كيف ترغب في المتابعة؟</p>
          </div>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.saveBtn} onClick={onSaveDraft}>
            <Save size={16} />
            <span>حفظ كمسودة</span>
          </button>
          <button type="button" className={styles.discardBtn} onClick={onDiscard}>
            <Trash2 size={16} />
            <span>تجاهل التغييرات</span>
          </button>
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>
            <ArrowRight size={16} />
            <span>متابعة التعديل</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DraftConfirmModal;
