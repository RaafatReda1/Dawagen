import { LogOut } from "lucide-react";
import styles from "./SafeExitBtn.module.css";

const SafeExitBtn = ({ onExit }) => (
  <button type="button" className={styles.btn} onClick={onExit}>
    <LogOut size={15} />
    <span>مغادرة وحفظ تلقائي</span>
  </button>
);

export default SafeExitBtn;
