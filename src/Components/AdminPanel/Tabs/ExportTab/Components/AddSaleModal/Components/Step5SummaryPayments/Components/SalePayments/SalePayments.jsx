import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import styles from "./SalePayments.module.css";

const PAYMENT_TYPES = [
  { val: "cash", label: "نقداً (كاش)" },
  { val: "istapay", label: "إنستاباي" },
  { val: "vodafonecash", label: "فودافون كاش" },
];

const SalePayments = ({ payments = [], onAddPayment, onRemovePayment, totalPaid, remaining, totalPrice, notify }) => {
  const [type, setType] = useState("cash");
  const [amount, setAmount] = useState("");

  const handleAdd = () => {
    const val = parseFloat(amount);
    if (!val || val <= 0) return notify("يرجى إدخال مبلغ صحيح للدفعة", "error");
    if (totalPaid + val > totalPrice && totalPrice > 0) return notify(`إجمالي المدفوعات لا يمكن أن يتجاوز قيمة الشحنة (${totalPrice} ج.م)`, "error");
    onAddPayment({ type, amount: val, date: new Date().toLocaleDateString("en-GB") });
    setAmount("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputRow}>
        <select value={type} onChange={(e) => setType(e.target.value)} className={styles.select}>
          {PAYMENT_TYPES.map((t) => <option key={t.val} value={t.val}>{t.label}</option>)}
        </select>
        <input type="number" placeholder="المبلغ (ج.م)..." value={amount} onChange={(e) => setAmount(e.target.value)} className={styles.amountInput} />
        <button type="button" className={styles.addBtn} onClick={handleAdd}><Plus size={16} /><span>إضافة دفعة</span></button>
      </div>
      <div className={styles.summaryBar}>
        <span>المدفوع: <strong>{totalPaid.toLocaleString()} ج.م</strong></span>
        <span>المتبقي: <strong className={remaining > 0 ? styles.due : styles.settled}>{remaining.toLocaleString()} ج.م</strong></span>
      </div>
      <div className={styles.list}>
        {payments.map((p, idx) => (
          <div key={idx} className={styles.item}>
            <span>{p.type === "cash" ? "نقداً" : p.type === "istapay" ? "إنستاباي" : "فودافون كاش"}</span>
            <strong>{Number(p.amount).toLocaleString()} ج.م</strong>
            <button type="button" onClick={() => onRemovePayment(idx)} className={styles.delBtn}><Trash2 size={13} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalePayments;
