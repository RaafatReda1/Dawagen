import useCycleDetails from "../../../../hooks/useCycleDetails";
import { useCycleRouteInfo } from "../../Hooks/useCycleRouteInfo";
import { ExportProvider } from "./Contexts/ExportContext";
import ExportMainSwitcher from "./Components/ExportMainSwitcher/ExportMainSwitcher";
import styles from "./ExportTab.module.css";

const ExportTab = () => {
  const { cycleId, cycleData, loading, notFound } = useCycleRouteInfo();
  const { rawData, refetch, loading: detailsLoading } = useCycleDetails(cycleId);

  if (!rawData && (loading || detailsLoading)) {
    return <div className={styles.status}>جاري تحميل بيانات مبيعات التصدير والتجار...</div>;
  }

  if (notFound || !cycleId) {
    return <div className={styles.status}>الدورة غير موجودة أو لا توجد دورة نشطة</div>;
  }

  return (
    <ExportProvider
      cycleId={cycleId}
      cycleData={cycleData}
      rawData={rawData}
      refetch={refetch}
    >
      <ExportMainSwitcher />
    </ExportProvider>
  );
};

export default ExportTab;