import { Truck } from "lucide-react";
import { useFeed } from "../../Contexts/FeedContext";
import ShipmentsTable from "./Components/ShipmentsTable/ShipmentsTable";
import styles from "./FeedShipmentsSection.module.css";

const FeedShipmentsSection = () => {
  const { rawData } = useFeed();
  const shipments = rawData?.feedShipments || [];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <Truck size={20} className={styles.icon} />
          <h2 className={styles.title}>سجل شحنات وتوريدات الأعلاف</h2>
        </div>
        <span className={styles.badge}>{shipments.length} شحنات مسجلة</span>
      </div>

      <ShipmentsTable shipments={shipments} />
    </section>
  );
};

export default FeedShipmentsSection;
