import React, { useState } from "react";
import TraderProfileModal from "../Modals/TraderProfileModal/TraderProfileModal";
import styles from "./MedicineSuppliersTable.module.css";

const MedicineSuppliersTable = ({ invoices = [] }) => {
  const [selectedTrader, setSelectedTrader] = useState(null);

  return (
    <div className={styles.card}>
      <div className={styles.header}>كشف حساب الصيدليات وموردي الأدوية</div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead><tr><th>اسم الصيدلية / المورد</th><th>الفواتير</th><th>الإجمالي</th><th>المدفوع</th><th>الديون المتبقية</th><th>الحالة</th></tr></thead>
          <tbody>
            {invoices.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: "center", color: "#9CA3AF" }}>لا توجد ديون أو مسحوبات أدوية</td></tr>
            ) : (
              invoices.map((inv, idx) => (
                <tr key={idx} style={{ cursor: "pointer" }} onClick={() => setSelectedTrader({ info: inv.MedicineSuppliers || { name: `مورد أدوية #${idx + 1}` }, roleLabel: "مورد أدوية", operations: [inv] })}>
                  <td style={{ color: "#1F6E56", textDecoration: "underline" }}><strong>{inv.MedicineSuppliers?.name || `مورد أدوية #${idx + 1}`}</strong></td>
                  <td>DATA HERE!</td>
                  <td>DATA HERE!</td>
                  <td>DATA HERE!</td>
                  <td>DATA HERE!</td>
                  <td><span className={styles.badgePaid}>DATA HERE!</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {selectedTrader && <TraderProfileModal traderData={selectedTrader} onClose={() => setSelectedTrader(null)} />}
    </div>
  );
};

export default MedicineSuppliersTable;
