import styles from "./InvoiceItemsSubTable.module.css";

const InvoiceItemsSubTable = ({ items = [] }) => {
  if (items.length === 0) {
    return <div className={styles.empty}>لا توجد أصناف مسجلة داخل هذه الفاتورة.</div>;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.subTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>اسم الصنف / الدواء</th>
            <th>عدد العبوات</th>
            <th>سعة العبوة</th>
            <th>سعر العبوة</th>
            <th>الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          {items.map((m, idx) => {
            const count = Number(m.units_count) || 0;
            const price = Number(m.unit_price) || 0;
            return (
              <tr key={m.id || idx}>
                <td>#{idx + 1}</td>
                <td><strong>{m.name}</strong></td>
                <td>{count.toLocaleString()}</td>
                <td>{m.unit_capacity ? `${m.unit_capacity} ${m.measurement_type || ""}` : "-"}</td>
                <td>{price.toLocaleString()} ج.م</td>
                <td>{(count * price).toLocaleString()} ج.م</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceItemsSubTable;
