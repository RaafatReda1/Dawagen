import React from "react";
import { X, Printer, FileText } from "lucide-react";
import { formatEgp } from "../../../../../../../../../utils/formatters";
import { generateInvoicePdf } from "../../../../../../../../../utils/pdfGenerator";
import styles from "./InvoiceDetailsModal.module.css";

const InvoiceDetailsModal = ({ invoice, onClose }) => {
  if (!invoice) return null;
  const items = invoice.Medicine || [];
  const supplierName = invoice.MedicineSuppliers?.name || `مورد أدوية #${invoice.supplier_id || 1}`;
  const invDate = invoice.created_at ? new Date(invoice.created_at).toLocaleDateString("ar-EG") : "غير محدد";

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div><h3 className={styles.title}><FileText size={18} style={{ marginLeft: 6 }} />فاتورة علاجات: {supplierName}</h3><span style={{ fontSize: "0.8rem", color: "#6B7280" }}>تاريخ الصدور: {invDate}</span></div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => generateInvoicePdf(invoice)} className={styles.printBtn}><Printer size={14} /><span>تحميل PDF الفاتورة</span></button>
            <button className={styles.closeBtn} onClick={onClose} style={{ background: "#F3F4F6", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer" }}><X size={16} /></button>
          </div>
        </div>
        <table className={styles.table}>
          <thead><tr><th>اسم العلاج / الصنف</th><th>العدد</th><th>السعة / التركيز</th><th>سعر الوحدة</th><th>الإجمالي</th></tr></thead>
          <tbody>
            {items.length === 0 ? <tr><td colSpan="5" style={{ textAlign: "center", color: "#9CA3AF" }}>تفاصيل العلاجات مسجلة إجمالياً بالفاتورة</td></tr> : (
              items.map((m, idx) => (
                <tr key={idx}>
                  <td><strong>{m.name || "علاج بيطري"}</strong></td>
                  <td>{m.units_count || 1} {m.measurement_type || "عبوة"}</td>
                  <td>{m.unit_capacity || "—"}</td>
                  <td>{formatEgp(m.unit_price || 0)}</td>
                  <td>{formatEgp((m.units_count || 1) * (m.unit_price || 0))}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div style={{ background: "#F9FAFB", padding: "12px 16px", borderRadius: "12px", display: "flex", justifyContent: "space-between", fontWeight: 800 }}>
          <span>إجمالي الفاتورة: {formatEgp(invoice.calculatedTotal || invoice.total_price || 0)}</span>
          <span style={{ color: invoice.hasUnpaidBalance ? "#DC2626" : "#059669" }}>{invoice.hasUnpaidBalance ? `متبقي آجل: ${formatEgp(invoice.calculatedDebt)}` : "مسددة بالكامل"}</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsModal;
