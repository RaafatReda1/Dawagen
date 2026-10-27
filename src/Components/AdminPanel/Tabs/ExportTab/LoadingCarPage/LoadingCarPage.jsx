import { LoadingSessionProvider } from "./Contexts/LoadingSessionContext";
import LoadingCarView from "./Components/LoadingCarView/LoadingCarView";
import styles from "./LoadingCarPage.module.css";

const LoadingCarPage = ({
  cycleId,
  saleId,
  saleData,
  importer,
  importers = [],
  activeLoadings = [],
  onSelectSession,
  onNewSession,
  onSaleIdChange,
  onClose,
  refetch,
}) => {
  const handleFinish = async () => {
    if (refetch) await refetch();
    onClose();
  };

  return (
    <div className={styles.wrapper}>
      <LoadingSessionProvider
        cycleId={cycleId}
        initialSaleId={saleId}
        initialSaleData={saleData}
        initialImporter={importer}
        importers={importers}
        activeLoadings={activeLoadings}
        onSaleIdChange={onSaleIdChange}
        onClose={onClose}
      >
        <LoadingCarView
          onSelectSession={onSelectSession}
          onNewSession={onNewSession}
          onFinish={handleFinish}
        />
      </LoadingSessionProvider>
    </div>
  );
};

export default LoadingCarPage;
