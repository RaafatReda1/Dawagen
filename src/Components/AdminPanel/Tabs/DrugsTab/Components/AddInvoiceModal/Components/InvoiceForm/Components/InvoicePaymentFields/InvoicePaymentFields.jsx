import styles from "./InvoicePaymentFields.module.css";

const PAYMENT_METHODS = [
  { value: "cash", label: "كاش (نقدي)" },
  { value: "vodafone_cash", label: "فودافون كاش / محفظة" },
  { value: "instapay", label: "إنستاباي (InstaPay)" },
];

const InvoicePaymentFields = ({ paidAmount, paymentType, diseaseId, onChange, diseases = [], maxAmount }) => {
  const isOver = parseFloat(paidAmount) > maxAmount && maxAmount > 0;

  return (
    <div className={styles.row}>
      <div className={styles.group}>
        <label>المسدد مقدماً (إن وجد)</label>
        <input
          type="number" step="0.5" min="0" max={maxAmount > 0 ? maxAmount : undefined}
          name="paid_amount" value={paidAmount} onChange={onChange} placeholder="0 للآجل بالكامل"
        />
        {isOver && <span className={styles.warning}>المبلغ المدفوع يتجاوز إجمالي الفاتورة!</span>}
      </div>

      {parseFloat(paidAmount) > 0 && (
        <div className={styles.group}>
          <label>طريقة الدفع</label>
          <select name="payment_type" value={paymentType} onChange={onChange}>
            {PAYMENT_METHODS.map((pm) => <option key={pm.value} value={pm.value}>{pm.label}</option>)}
          </select>
        </div>
      )}

      <div className={styles.group}>
        <label>مرض مستهدف (اختياري)</label>
        <select name="disease_id" value={diseaseId} onChange={onChange}>
          <option value="">-- عام / وقائي بدون تشخيص --</option>
          {diseases.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </div>
    </div>
  );
};

export default InvoicePaymentFields;
