import styles from "./InvoiceSupplierSelector.module.css";

const InvoiceSupplierSelector = ({ supplierId, newSupplierName, onChange, suppliers = [] }) => (
  <div className={styles.wrapper}>
    <div className={styles.group}>
      <label>المورد / الشركة</label>
      <select name="supplier_id" value={supplierId} onChange={onChange}>
        <option value="">-- اختر مورد مسجل أو اكتب بالأسفل --</option>
        {suppliers.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
    </div>

    {!supplierId && (
      <div className={styles.group}>
        <label>اسم مورد / شركة جديدة</label>
        <input type="text" name="new_supplier_name" value={newSupplierName} onChange={onChange} placeholder="اسم المورد" />
      </div>
    )}
  </div>
);

export default InvoiceSupplierSelector;
