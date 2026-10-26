import { CheckCircle2, AlertCircle } from "lucide-react";
import { useFeed } from "../../Contexts/FeedContext";
import styles from "./FeedNotification.module.css";

const FeedNotification = () => {
  const { notification } = useFeed();
  if (!notification) return null;

  const isSuccess = notification.type === "success";

  return (
    <div className={`${styles.banner} ${isSuccess ? styles.success : styles.error}`}>
      {isSuccess ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
      <span>{notification.message}</span>
    </div>
  );
};

export default FeedNotification;
