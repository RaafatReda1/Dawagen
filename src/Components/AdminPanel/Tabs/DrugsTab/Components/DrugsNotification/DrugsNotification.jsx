import { useDrugs } from "../../Contexts/DrugsContext";
import styles from "./DrugsNotification.module.css";

const DrugsNotification = () => {
  const { notification } = useDrugs();
  if (!notification) return null;

  return (
    <div
      className={`${styles.notification} ${
        notification.type === "error" ? styles.error : styles.success
      }`}
    >
      {notification.message}
    </div>
  );
};

export default DrugsNotification;
