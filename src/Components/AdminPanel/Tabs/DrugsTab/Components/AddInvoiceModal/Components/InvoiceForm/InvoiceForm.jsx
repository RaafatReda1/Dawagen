import InvoiceSupplierSelector from "./Components/InvoiceSupplierSelector/InvoiceSupplierSelector";
import InvoiceItemsEditor from "./Components/InvoiceItemsEditor/InvoiceItemsEditor";
import InvoicePaymentFields from "./Components/InvoicePaymentFields/InvoicePaymentFields";
import styles from "./InvoiceForm.module.css";

const InvoiceForm = ({
  form, onChange, onSubmit, isSubmitting, suppliers, diseases,
  onAddItem, onUpdateItem, onRemoveItem, totalPrice,
}) => {
  const paid = parseFloat(form.paid_amount) || 0;
  const remaining = Math.max(0, totalPrice - paid);

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <InvoiceSupplierSelector supplierId={form.supplier_id} newSupplierName={form.new_supplier_name} onChange={onChange} suppliers={suppliers} />
      <InvoiceItemsEditor items={form.medicines} onAddItem={onAddItem} onUpdateItem={onUpdateItem} onRemoveItem={onRemoveItem} />
      <InvoicePaymentFields paidAmount={form.paid_amount} paymentType={form.payment_type} diseaseId={form.disease_id} onChange={onChange} diseases={diseases} maxAmount={totalPrice} />
      {totalPrice > 0 && (
        <div className={styles.costBox}>
          <span>إجمالي الفاتورة: <strong>{totalPrice.toLocaleString()} ج.م</strong></span>
          {paid > 0 && <span>المتبقي: <strong>{remaining.toLocaleString()} ج.م</strong></span>}
        </div>
      )}
      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? "جاري الحفظ..." : "حفظ الفاتورة والأصناف"}
      </button>
    </form>
  );
};

export default InvoiceForm;
