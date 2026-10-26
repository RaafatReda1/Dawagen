import useCycleDetails from "../../../../hooks/useCycleDetails";
import { useCycleRouteInfo } from "../../Hooks/useCycleRouteInfo";
import { DrugsProvider } from "./Contexts/DrugsContext";
import DrugsContent from "./Components/DrugsContent/DrugsContent";
import styles from "./DrugsTab.module.css";

const DrugsTab = () => {
  const { cycleId, cycleData, loading, notFound } = useCycleRouteInfo();
  const { rawData, refetch, loading: detailsLoading } = useCycleDetails(cycleId);

  if (loading || detailsLoading) {
    return <div className={styles.status}>جاري تحميل بيانات الأدوية والتحصينات...</div>;
  }

  if (notFound || !cycleId) {
    return <div className={styles.status}>الدورة غير موجودة أو لا توجد دورة نشطة</div>;
  }

  return (
    <DrugsProvider
      cycleId={cycleId}
      cycleData={cycleData}
      rawData={rawData}
      refetch={refetch}
    >
      <DrugsContent />
    </DrugsProvider>
  );
};

export default DrugsTab;