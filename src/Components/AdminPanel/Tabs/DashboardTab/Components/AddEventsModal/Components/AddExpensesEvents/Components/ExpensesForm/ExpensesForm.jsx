import styles from "./ExpensesForm.module.css";

const ExpensesForm = ({ form, onChange, onSubmit, isSubmitting }) => (
  <form className={styles.form} onSubmit={onSubmit}>
    <div className={styles.group}>
      <label>بند المصروف</label>
      <input
        type="text"
        name="expense_item"
        value={form.expense_item}
        onChange={onChange}
        placeholder="مثال: نشارة، صيانة، عمالة..."
        required
      />
    </div>
    <div className={styles.group}>
      <label>المبلغ (جنيه)</label>
      <input
        type="number"
        step="0.01"
        name="amount"
        value={form.amount}
        onChange={onChange}
        placeholder="0.00"
        required
      />
    </div>
    <div className={styles.group}>
      <label>طريقة الدفع</label>
      <select name="payment_type" value={form.payment_type} onChange={onChange}>
        <option value="cash">كاش / نقدي (Cash)</option>
        <option value="credit">آجل (Credit)</option>
        <option value="vodafone_cash">فودافون كاش / محفظة إلكترونية (eWallet)</option>
        <option value="instapay">إنستاباي (InstaPay)</option>
      </select>
    </div>
    <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
      {isSubmitting ? "جاري الإرسال..." : "إضافة المصروف"}
    </button>
  </form>
);

export default ExpensesForm;
