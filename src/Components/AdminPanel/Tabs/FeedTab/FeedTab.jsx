import useCycleDetails from "../../../../hooks/useCycleDetails";
import { useCycleRouteInfo } from "../../Hooks/useCycleRouteInfo";
import { FeedProvider } from "./Contexts/FeedContext";
import FeedContent from "./Components/FeedContent/FeedContent";
import styles from "./FeedTab.module.css";

const FeedTab = () => {
  const { cycleId, cycleData, loading, notFound } = useCycleRouteInfo();
  const { rawData, refetch, loading: detailsLoading } = useCycleDetails(cycleId);

  if (loading || detailsLoading) {
    return <div className={styles.status}>جاري تحميل بيانات الأعلاف...</div>;
  }

  if (notFound || !cycleId) {
    return <div className={styles.status}>الدورة غير موجودة أو لا توجد دورة نشطة</div>;
  }

  return (
    <FeedProvider
      cycleId={cycleId}
      cycleData={cycleData}
      rawData={rawData}
      refetch={refetch}
    >
      <FeedContent />
    </FeedProvider>
  );
};

export default FeedTab;