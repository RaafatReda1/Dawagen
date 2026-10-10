import React, { useState } from "react";
import { Syringe, FileText } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import InvoiceDetailsModal from "../Modals/InvoiceDetailsModal/InvoiceDetailsModal";
import styles from "./DiseasesAndMedsChart.module.css";

const DiseasesAndMedsChart = ({ medicineFinancials }) => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const invoices = medicineFinancials?.invoices || [];
  const chartData = invoices.map((inv, idx) => ({ supplier: inv.MedicineSuppliers?.name || `مورد #${idx + 1}`, cost: inv.calculatedTotal || 0 }));

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><Syringe size={20} color="#DC2626" /><span>الأمراض وفواتير العلاجات</span></div>
        <span style={{ fontSize: "0.85rem", color: "#DC2626", fontWeight: 800 }}>إجمالي: DATA HERE!</span>
      </div>
      <div className={styles.chartBox}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="supplier" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="cost" fill="#EF4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.invoiceGrid}>
        {invoices.length === 0 ? <div style={{ color: "#9CA3AF", textAlign: "center" }}>لا توجد فواتير مسجلة</div> : (
          invoices.map((inv, idx) => (
            <div key={idx} className={styles.invoiceCard}>
              <div>
                <div className={styles.supplierTitle}>{inv.MedicineSuppliers?.name || `صيدلية #${idx + 1}`}</div>
                <div className={styles.dateSub}>القيمة: <strong>DATA HERE!</strong></div>
              </div>
              <button onClick={() => setSelectedInvoice(inv)} className={styles.btnDetail}><FileText size={14} /><span>تفاصيل</span></button>
            </div>
          ))
        )}
      </div>
      {selectedInvoice && <InvoiceDetailsModal invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />}
    </div>
  );
};

export default DiseasesAndMedsChart;
