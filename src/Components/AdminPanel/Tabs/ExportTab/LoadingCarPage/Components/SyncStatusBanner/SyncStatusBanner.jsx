import RoleIndicator from "./Components/RoleIndicator/RoleIndicator";
import AutoSaveIndicator from "./Components/AutoSaveIndicator/AutoSaveIndicator";
import RoleSwitchBtn from "./Components/RoleSwitchBtn/RoleSwitchBtn";
import styles from "./SyncStatusBanner.module.css";

const SyncStatusBanner = ({ role, activeUsersCount, saveStatus, onClaimWriter }) => (
  <div className={styles.banner}>
    <div className={styles.left}>
      <RoleIndicator role={role} activeUsersCount={activeUsersCount} />
      <RoleSwitchBtn role={role} onClaimWriter={onClaimWriter} />
    </div>
    <div className={styles.right}>
      <AutoSaveIndicator status={saveStatus} />
    </div>
  </div>
);

export default SyncStatusBanner;
