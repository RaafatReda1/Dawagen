import { Edit3, Eye } from "lucide-react";
import styles from "./RoleIndicator.module.css";

const RoleIndicator = ({ role, activeUsersCount }) => (
  <div className={`${styles.badge} ${role === "writer" ? styles.writer : styles.previewer}`}>
    {role === "writer" ? (
      <>
        <Edit3 size={15} />
        <span>أنت المحرر النشط للإدخال</span>
      </>
    ) : (
      <>
        <Eye size={15} />
        <span>وضع المعاينة الحية (مراقب)</span>
      </>
    )}
    {activeUsersCount > 1 && (
      <span className={styles.counter}>{activeUsersCount} متصلين</span>
    )}
  </div>
);

export default RoleIndicator;
