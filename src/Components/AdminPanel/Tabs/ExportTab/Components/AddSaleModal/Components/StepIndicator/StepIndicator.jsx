import { User, Truck, Scale, CheckCircle2, DollarSign } from "lucide-react";
import styles from "./StepIndicator.module.css";

const STEPS = [
  { num: 1, label: "التاجر", icon: User },
  { num: 2, label: "السيارة والأقفاص", icon: Truck },
  { num: 3, label: "وزن الفارغ", icon: Scale },
  { num: 4, label: "الوزن القائم", icon: CheckCircle2 },
  { num: 5, label: "الحساب والدفعات", icon: DollarSign },
];

const StepIndicator = ({ currentStep, onSelectStep }) => (
  <div className={styles.wrapper}>
    {STEPS.map((s, idx) => {
      const Icon = s.icon;
      const isActive = currentStep === s.num;
      const isDone = currentStep > s.num;

      return (
        <div
          key={s.num}
          className={`${styles.step} ${isActive ? styles.active : isDone ? styles.done : ""}`}
          onClick={() => (isDone || isActive ? onSelectStep(s.num) : null)}
        >
          <div className={styles.circle}>
            <Icon size={14} />
          </div>
          <span className={styles.label}>{s.label}</span>
          {idx < STEPS.length - 1 && <div className={styles.line} />}
        </div>
      );
    })}
  </div>
);

export default StepIndicator;
