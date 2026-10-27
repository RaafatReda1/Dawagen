import { useExport } from "../../Contexts/ExportContext";
import ExportNotification from "../ExportNotification/ExportNotification";
import ExportHeader from "../ExportHeader/ExportHeader";
import ExportOverview from "../ExportOverview/ExportOverview";
import ActiveLoadingsSection from "../ActiveLoadingsSection/ActiveLoadingsSection";
import SalesListSection from "../SalesListSection/SalesListSection";
import ImportersSection from "../ImportersSection/ImportersSection";
import styles from "./ExportContent.module.css";

const ExportContent = () => {
  const { activeLoadings, openLoadingPage, deleteLoading } = useExport();

  return (
    <div className={styles.container}>
      <ExportNotification />
      <ExportHeader />
      <ExportOverview />
      <ActiveLoadingsSection
        activeLoadings={activeLoadings}
        onResume={(sale) => openLoadingPage(sale.id, sale.Importers)}
        onDelete={deleteLoading}
      />
      <SalesListSection />
      <ImportersSection />
    </div>
  );
};

export default ExportContent;
