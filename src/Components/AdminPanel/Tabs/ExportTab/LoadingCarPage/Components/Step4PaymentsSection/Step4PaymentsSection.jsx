import { ArrowRight } from "lucide-react";
import PriceAndSummary from "./Components/PriceAndSummary/PriceAndSummary";
import PaymentEntryForm from "./Components/PaymentEntryForm/PaymentEntryForm";
import PaymentsHistory from "./Components/PaymentsHistory/PaymentsHistory";
import CompleteSaleBtn from "./Components/CompleteSaleBtn/CompleteSaleBtn";
import styles from "./Step4PaymentsSection.module.css";

const Step4PaymentsSection = ({
  executionPrice,
  onPriceChange,
  payments,
  onAddPayment,
  onRemovePayment,
  calculations,
  isReadOnly,
  isSubmitting,
  onComplete,
  onPrev,
  onAutoSave,
}) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <h3>الحساب المالي والدفعات النقدية</h3>
      <p>تحديد سعر التنفيذ، تسجيل الدفعات المحصلة، وإقفال حساب سيارة التاجر.</p>
    </div>
    <PriceAndSummary executionPrice={executionPrice} onPriceChange={onPriceChange} onBlur={onAutoSave} calculations={calculations} isReadOnly={isReadOnly} />
    <PaymentEntryForm onAddPayment={onAddPayment} isReadOnly={isReadOnly} />
    <PaymentsHistory payments={payments} onRemovePayment={onRemovePayment} isReadOnly={isReadOnly} />
    <div className={styles.footer}>
      <button type="button" className={styles.prevBtn} onClick={onPrev}>
        <ArrowRight size={16} /><span>السابق (وزن القائم)</span>
      </button>
      <CompleteSaleBtn onComplete={onComplete} isReadOnly={isReadOnly} isSubmitting={isSubmitting} />
    </div>
  </div>
);

export default Step4PaymentsSection;
