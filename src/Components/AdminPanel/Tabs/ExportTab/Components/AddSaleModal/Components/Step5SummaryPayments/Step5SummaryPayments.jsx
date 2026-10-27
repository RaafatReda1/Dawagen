import { ArrowRight, CheckCircle2 } from "lucide-react";
import SalePricing from "./Components/SalePricing/SalePricing";
import SalePayments from "./Components/SalePayments/SalePayments";
import {
  calculateTareTotal, calculateGrossTotal, calculateNetWeight,
  calculateSaleTotal, calculatePaymentsTotal, calculateRemaining
} from "../../../../Utils";
import styles from "./Step5SummaryPayments.module.css";

const Step5SummaryPayments = ({ form, setForm, weights, onSubmit, onPrev, isSubmitting, notify }) => {
  const tareTotal = calculateTareTotal(weights.tareWeights);
  const grossTotal = calculateGrossTotal(weights.grossWeights);
  const netWeight = calculateNetWeight(grossTotal, tareTotal);
  const totalPrice = calculateSaleTotal(netWeight, form.execution_price);
  const payments = form.payments || [];
  const totalPaid = calculatePaymentsTotal(payments);
  const remaining = calculateRemaining(totalPrice, totalPaid);

  const handlePriceChange = (val) => setForm((p) => ({ ...p, execution_price: val }));
  const handleAddPayment = (p) => setForm((prev) => ({ ...prev, payments: [...(prev.payments || []), p] }));
  const handleRemovePayment = (idx) => setForm((prev) => ({ ...prev, payments: (prev.payments || []).filter((_, i) => i !== idx) }));

  return (
    <div className={styles.container}>
      <SalePricing netWeight={netWeight} executionPrice={form.execution_price} onPriceChange={handlePriceChange} totalPrice={totalPrice} />
      <SalePayments payments={payments} onAddPayment={handleAddPayment} onRemovePayment={handleRemovePayment} totalPaid={totalPaid} remaining={remaining} totalPrice={totalPrice} notify={notify} />

      <div className={styles.footer}>
        <button type="button" className={styles.prevBtn} onClick={onPrev} disabled={isSubmitting}>
          <ArrowRight size={16} />
          <span>السابق (الوزن القائم)</span>
        </button>
        <button type="button" className={styles.submitBtn} onClick={onSubmit} disabled={isSubmitting}>
          <CheckCircle2 size={16} />
          <span>{isSubmitting ? "جاري الحفظ..." : "حفظ وإنهاء تحميل السيارة"}</span>
        </button>
      </div>
    </div>
  );
};

export default Step5SummaryPayments;
