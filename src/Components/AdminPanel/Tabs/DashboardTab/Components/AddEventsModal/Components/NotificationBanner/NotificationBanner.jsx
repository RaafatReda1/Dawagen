import { CheckCircle2, AlertCircle } from "lucide-react";
import { useEvents } from "../../Contexts/EventsContext";
import styles from "./NotificationBanner.module.css";

const NotificationBanner = () => {
  const { notification } = useEvents();
  if (!notification) return null;

  const isSuccess = notification.type === "success";
  return (
    <div className={`${styles.banner} ${isSuccess ? styles.success : styles.error}`}>
      {isSuccess ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
      <span>{notification.message}</span>
    </div>
  );
};

export default NotificationBanner;
