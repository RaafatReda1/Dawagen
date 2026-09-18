import { Plus, Egg } from "lucide-react";
import { useCycles } from "../Context/CycleContext";
import styles from "./EmptyCycleState.module.css";

const EmptyCycleState = () => {
  const { openNewModal } = useCycles();

  return (
    <div className={styles.emptyCard}>
      <div className={styles.iconCircle}>
        <Egg size={32} />
      </div>
      <h3 className={styles.title}>لا توجد دورة نشطة حالياً</h3>
      <p className={styles.desc}>
        ابدأ دورة تربية جديدة لتسجيل ومتابعة الأيام اليومية، استهلاك العلف، الأدوية، وحسابات يوم التصدير بكل سهولة ودقة.
      </p>
      <button className={styles.startBtn} onClick={openNewModal}>
        <Plus size={18} />
        <span>بدء دورة جديدة الآن</span>
      </button>
    </div>
  );
};

export default EmptyCycleState;
