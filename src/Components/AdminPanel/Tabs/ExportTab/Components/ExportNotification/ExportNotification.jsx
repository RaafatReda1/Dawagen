import { CheckCircle2, AlertCircle } from "lucide-react";
import { useExport } from "../../Contexts/ExportContext";
import styles from "./ExportNotification.module.css";

const ExportNotification = () => {
  const { notification } = useExport();
  if (!notification) return null;

  const isError = notification.type === "error";

  return (
    <div className={`${styles.toast} ${isError ? styles.error : styles.success}`}>
      {isError ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
      <span>{notification.message}</span>
    </div>
  );
};

export default ExportNotification;
