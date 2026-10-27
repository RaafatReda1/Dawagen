import { useState } from "react";
import { Plus } from "lucide-react";
import styles from "./PaymentEntryForm.module.css";

const PAYMENT_METHODS = ["نقدي (كاش)", "تحويل بنكي / إنستاباي", "فودافون كاش", "شيك"];

const PaymentEntryForm = ({ onAddPayment, isReadOnly }) => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState(PAYMENT_METHODS[0]);
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) return;
    onAddPayment({
      amount: val,
      method,
      note: note.trim(),
      date: new Date().toLocaleDateString("ar-EG"),
    });
    setAmount("");
    setNote("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label>المبلغ المدفوع (ج.م) *</label>
        <input type="number" step="10" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="مثال: 50000" disabled={isReadOnly} required />
      </div>
      <div className={styles.field}>
        <label>طريقة الدفع</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)} disabled={isReadOnly}>
          {PAYMENT_METHODS.map((m) => (<option key={m} value={m}>{m}</option>))}
        </select>
      </div>
      <div className={styles.field}>
        <label>بيان / رقم العملية</label>
        <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="مثال: دفعة تحت الحساب" disabled={isReadOnly} />
      </div>
      <button type="submit" className={styles.addBtn} disabled={isReadOnly}>
        <Plus size={16} /><span>إضافة دفعة</span>
      </button>
    </form>
  );
};

export default PaymentEntryForm;
