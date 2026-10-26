import styles from "./ShipmentForm.module.css";
import ShipmentSupplierSelector from "./Components/ShipmentSupplierSelector/ShipmentSupplierSelector";
import ShipmentPaymentInputs from "./Components/ShipmentPaymentInputs/ShipmentPaymentInputs";

const ShipmentForm = ({ form, onChange, onSubmit, isSubmitting, suppliers }) => {
  const totalCost = (parseFloat(form.sacks_count) || 0) * (parseFloat(form.sack_price) || 0);
  const remaining = Math.max(0, totalCost - (parseFloat(form.paid_amount) || 0));

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.row}>
        <div className={styles.group}>
          <label>نوع / اسم العلف</label>
          <input type="text" name="feed_name" value={form.feed_name} onChange={onChange} placeholder="بادي 23%" required />
        </div>
        <ShipmentSupplierSelector supplierId={form.supplier_id} newSupplierName={form.new_supplier_name} onChange={onChange} suppliers={suppliers} />
      </div>
      <div className={styles.row}>
        <div className={styles.group}>
          <label>عدد الشكائر</label>
          <input type="number" name="sacks_count" value={form.sacks_count} onChange={onChange} placeholder="100" required />
        </div>
        <div className={styles.group}>
          <label>وزن الشيكارة (كجم)</label>
          <input type="number" step="0.5" name="sack_weight" value={form.sack_weight} onChange={onChange} placeholder="25" required />
        </div>
        <div className={styles.group}>
          <label>سعر الشيكارة (ج.م)</label>
          <input type="number" step="0.5" name="sack_price" value={form.sack_price} onChange={onChange} placeholder="350" required />
        </div>
      </div>
      <ShipmentPaymentInputs paidAmount={form.paid_amount} paymentType={form.payment_type} onChange={onChange} />
      {totalCost > 0 && (
        <div className={styles.costBox}>
          <span>الإجمالي: <strong>{totalCost.toLocaleString()} ج.م</strong></span>
          {parseFloat(form.paid_amount) > 0 && <span>المتبقي: <strong>{remaining.toLocaleString()} ج.م</strong></span>}
        </div>
      )}
      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? "جاري الحفظ..." : "تسجيل الشحنة"}
      </button>
    </form>
  );
};
export default ShipmentForm;
