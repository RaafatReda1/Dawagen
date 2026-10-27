import { User, Scale, CheckCircle2, DollarSign } from "lucide-react";
import styles from "./SectionTabs.module.css";

const STEPS = [
  { id: 1, label: "التاجر والسيارة", icon: User },
  { id: 2, label: "وزن الفارغ", icon: Scale },
  { id: 3, label: "وزن القائم والطيور", icon: CheckCircle2 },
  { id: 4, label: "الحساب والدفعات", icon: DollarSign },
];

const SectionTabs = ({ activeStep, onSelectStep, tareCount = 0, grossCount = 0 }) => (
  <nav className={styles.tabs} aria-label="أقسام التحميل">
    {STEPS.map((s) => {
      const Icon = s.icon;
      const isActive = activeStep === s.id;
      return (
        <button
          key={s.id}
          type="button"
          className={`${styles.tab} ${isActive ? styles.active : ""}`}
          onClick={() => onSelectStep(s.id)}
        >
          <Icon size={16} />
          <span>{s.label}</span>
          {s.id === 2 && tareCount > 0 && <span className={styles.count}>{tareCount}</span>}
          {s.id === 3 && grossCount > 0 && <span className={styles.count}>{grossCount}</span>}
        </button>
      );
    })}
  </nav>
);

export default SectionTabs;
