import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import InvoiceItemsSubTable from "./Components/InvoiceItemsSubTable/InvoiceItemsSubTable";
import styles from "./InvoiceRow.module.css";

const InvoiceRow = ({ invoice, index }) => {
  const [expanded, setExpanded] = useState(false);
  const total = Number(invoice.total_price) || 0;
  const paid = (invoice.payments || []).reduce((acc, p) => acc + (Number(p.amount) || 0), 0);
  const remaining = Math.max(0, total - paid);
  const medicines = invoice.Medicine || [];

  return (
    <>
      <tr className={`${styles.row} ${expanded ? styles.expandedRow : ""}`} onClick={() => setExpanded((p) => !p)}>
        <td className={styles.numCol}>#{index + 1}</td>
        <td><strong>{invoice.MedicineSuppliers?.name || "مورد غير مسجل"}</strong></td>
        <td>{medicines.length} أصناف</td>
        <td>{total.toLocaleString()} ج.م</td>
        <td>{paid.toLocaleString()} ج.م</td>
        <td className={remaining > 0 ? styles.dueText : ""}>{remaining.toLocaleString()} ج.م</td>
        <td>
          <span className={paid >= total && total > 0 ? styles.paidBadge : paid > 0 ? styles.partialBadge : styles.dueBadge}>
            {paid >= total && total > 0 ? "خالص" : paid > 0 ? "مدفوع جزئياً" : "آجل"}
          </span>
        </td>
        <td className={styles.arrowCol}>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={8} className={styles.subCell}>
            <InvoiceItemsSubTable items={medicines} />
          </td>
        </tr>
      )}
    </>
  );
};

export default InvoiceRow;
