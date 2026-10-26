import { Scale, AlertCircle } from "lucide-react";
import styles from "./FeedWeightBadge.module.css";

const FeedWeightBadge = ({ sacks, sackWeight }) => {
  const sacksNum = parseFloat(sacks) || 0;
  if (sacksNum <= 0) return null;

  const numericWeight = sackWeight ? parseFloat(sackWeight) : null;
  if (!numericWeight) {
    return (
      <div className={styles.noWeight}>
        <AlertCircle size={15} />
        <span>وزن الشيكارة غير مسجل لهذه الشحنة بقاعدة البيانات</span>
      </div>
    );
  }

  const totalKg = (sacksNum * numericWeight).toFixed(1);
  const totalTons = (totalKg / 1000).toFixed(3);

  return (
    <div className={styles.badge}>
      <Scale size={16} className={styles.icon} />
      <div className={styles.info}>
        <span className={styles.label}>الوزن المستهلك:</span>
        <strong className={styles.val}>{totalKg} كجم ({totalTons} طن)</strong>
        <span className={styles.sub}>(وزن الشيكارة: {numericWeight} كجم)</span>
      </div>
    </div>
  );
};

export default FeedWeightBadge;
