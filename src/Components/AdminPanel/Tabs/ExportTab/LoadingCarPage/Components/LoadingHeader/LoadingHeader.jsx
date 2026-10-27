import BreadcrumbTrail from "./Components/BreadcrumbTrail/BreadcrumbTrail";
import ActiveSessionPicker from "./Components/ActiveSessionPicker/ActiveSessionPicker";
import SafeExitBtn from "./Components/SafeExitBtn/SafeExitBtn";
import styles from "./LoadingHeader.module.css";

const LoadingHeader = ({
  importerName,
  activeLoadings,
  currentSaleId,
  onSelectSession,
  onNewSession,
  onClose,
}) => (
  <header className={styles.header}>
    <BreadcrumbTrail importerName={importerName} onClose={onClose} />
    <div className={styles.actions}>
      <ActiveSessionPicker
        activeLoadings={activeLoadings}
        currentSaleId={currentSaleId}
        onSelectSession={onSelectSession}
        onNewSession={onNewSession}
      />
      <SafeExitBtn onExit={onClose} />
    </div>
  </header>
);

export default LoadingHeader;
