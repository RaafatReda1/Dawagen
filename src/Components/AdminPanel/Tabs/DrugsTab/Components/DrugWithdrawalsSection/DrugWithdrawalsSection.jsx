import { Activity } from "lucide-react";
import { useDrugs } from "../../Contexts/DrugsContext";
import WithdrawalsList from "./Components/WithdrawalsList/WithdrawalsList";
import styles from "./DrugWithdrawalsSection.module.css";

const DrugWithdrawalsSection = () => {
  const { rawData } = useDrugs();
  const withdrawals = rawData?.drugWithdrawals || [];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <Activity size={20} className={styles.icon} />
          <h2 className={styles.title}>سجل الجرعات والتحصينات اليومية</h2>
        </div>
        <span className={styles.badge}>{withdrawals.length} جرعات مسجلة</span>
      </div>

      <WithdrawalsList
        withdrawals={withdrawals}
        events={rawData?.events}
        days={rawData?.days}
        diseases={rawData?.diseases}
      />
    </section>
  );
};

export default DrugWithdrawalsSection;
