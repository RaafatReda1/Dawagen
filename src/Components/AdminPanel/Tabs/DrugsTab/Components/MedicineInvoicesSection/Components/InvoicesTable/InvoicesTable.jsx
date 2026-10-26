import InvoiceRow from "./Components/InvoiceRow/InvoiceRow";
import styles from "./InvoicesTable.module.css";

const InvoicesTable = ({ invoices = [] }) => {
  if (invoices.length === 0) {
    return <div className={styles.empty}>لا توجد فواتير أدوية مسجلة في هذه الدورة حتى الآن.</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>المورد / الشركة</th>
            <th>عدد الأصناف</th>
            <th>إجمالي الفاتورة</th>
            <th>المدفوع</th>
            <th>المتبقي</th>
            <th>حالة السداد</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv, idx) => (
            <InvoiceRow key={inv.id || idx} invoice={inv} index={idx} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesTable;
