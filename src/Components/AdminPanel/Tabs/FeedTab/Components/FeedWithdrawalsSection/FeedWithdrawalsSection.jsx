import { TrendingDown } from "lucide-react";
import { useFeed } from "../../Contexts/FeedContext";
import WithdrawalsTable from "./Components/WithdrawalsTable/WithdrawalsTable";
import styles from "./FeedWithdrawalsSection.module.css";

const FeedWithdrawalsSection = () => {
  const { rawData } = useFeed();
  const withdrawals = rawData?.foodWithdrawals || [];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <TrendingDown size={20} className={styles.icon} />
          <h2 className={styles.title}>سجل السحوبات اليومية للأعلاف</h2>
        </div>
        <span className={styles.badge}>{withdrawals.length} عمليات سحب</span>
      </div>

      <WithdrawalsTable
        withdrawals={withdrawals}
        events={rawData?.events}
        days={rawData?.days}
      />
    </section>
  );
};

export default FeedWithdrawalsSection;
