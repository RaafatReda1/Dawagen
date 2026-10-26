import styles from "./ShipmentPaymentInputs.module.css";

const PAYMENT_METHODS = [
  { value: "cash", label: "كاش (نقدي)" },
  { value: "vodafone_cash", label: "فودافون كاش / محفظة" },
  { value: "instapay", label: "إنستاباي (InstaPay)" },
];

const ShipmentPaymentInputs = ({ paidAmount, paymentType, onChange }) => (
  <div className={styles.wrapper}>
    <div className={styles.group}>
      <label>المبلغ المدفوع (مقدماً إن وجد)</label>
      <input
        type="number"
        step="0.5"
        name="paid_amount"
        value={paidAmount}
        onChange={onChange}
        placeholder="اتركه فارغاً إذا كان آجل بالكامل"
      />
    </div>

    {parseFloat(paidAmount) > 0 && (
      <div className={styles.group}>
        <label>طريقة الدفع</label>
        <select name="payment_type" value={paymentType} onChange={onChange}>
          {PAYMENT_METHODS.map((pm) => (
            <option key={pm.value} value={pm.value}>{pm.label}</option>
          ))}
        </select>
      </div>
    )}
  </div>
);

export default ShipmentPaymentInputs;
