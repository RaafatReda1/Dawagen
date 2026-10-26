import { PackageCheck, Truck, TrendingDown, AlertTriangle } from "lucide-react";
import { useFeed } from "../../Contexts/FeedContext";
import FeedStatCard from "./Components/FeedStatCard/FeedStatCard";
import styles from "./FeedInventoryOverview.module.css";

const FeedInventoryOverview = () => {
  const { metrics } = useFeed();

  const cards = [
    { label: "الرصيد المتبقي بالمخزن", sacks: metrics.remainingSacks, tons: (metrics.remainingKg / 1000).toFixed(2), icon: <PackageCheck size={20} className={styles.greenIcon} />, badge: "جاهز للاستهلاك" },
    { label: "إجمالي الوارد بالدورة", sacks: metrics.purchasedSacks, tons: (metrics.purchasedKg / 1000).toFixed(2), icon: <Truck size={20} className={styles.blueIcon} />, badge: `${metrics.totalCost?.toLocaleString()} ج.م` },
    { label: "إجمالي العلف المستهلك", sacks: metrics.consumedSacks, tons: (metrics.consumedKg / 1000).toFixed(2), icon: <TrendingDown size={20} className={styles.tealIcon} />, badge: "مأكول للطيور" },
    { label: "الهالك والتالف بالمخزن", sacks: metrics.damagedSacks, tons: (metrics.damagedKg / 1000).toFixed(2), icon: <AlertTriangle size={20} className={styles.amberIcon} />, badge: "تلف أو هدر" },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((c, i) => (
        <FeedStatCard key={i} {...c} />
      ))}
    </div>
  );
};

export default FeedInventoryOverview;
