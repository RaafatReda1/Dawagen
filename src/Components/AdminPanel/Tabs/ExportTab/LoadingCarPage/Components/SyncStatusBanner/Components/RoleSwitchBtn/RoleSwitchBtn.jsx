import { KeyRound } from "lucide-react";
import styles from "./RoleSwitchBtn.module.css";

const RoleSwitchBtn = ({ role, onClaimWriter }) => {
  if (role === "writer") return null;

  return (
    <button type="button" className={styles.btn} onClick={onClaimWriter}>
      <KeyRound size={14} />
      <span>طلب التحكم والتحرير</span>
    </button>
  );
};

export default RoleSwitchBtn;
