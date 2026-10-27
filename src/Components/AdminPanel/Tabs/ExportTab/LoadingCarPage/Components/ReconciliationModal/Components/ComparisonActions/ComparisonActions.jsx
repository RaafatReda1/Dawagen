import { Download, Server } from "lucide-react";
import styles from "./ComparisonActions.module.css";

const ComparisonActions = ({ onRestoreLocal, onKeepServer }) => (
  <div className={styles.actions}>
    <button type="button" className={styles.restoreBtn} onClick={onRestoreLocal}>
      <Download size={15} />
      <span>استعادة النسخة المحلية (الأحدث)</span>
    </button>
    <button type="button" className={styles.serverBtn} onClick={onKeepServer}>
      <Server size={15} />
      <span>اعتماد نسخة السيرفر وتجاهل المحلي</span>
    </button>
  </div>
);

export default ComparisonActions;
