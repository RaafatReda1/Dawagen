import React, { useState } from "react";
import TraderProfileModal from "../Modals/TraderProfileModal/TraderProfileModal";
import styles from "./FeedSuppliersTable.module.css";

const FeedSuppliersTable = ({ shipments = [] }) => {
  const [selectedTrader, setSelectedTrader] = useState(null);

  return (
    <div className={styles.card}>
      <div className={styles.header}>كشف حساب تجار وموردي الأعلاف</div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead><tr><th>اسم المورد</th><th>الكميات المسحوبة</th><th>الإجمالي</th><th>المدفوع</th><th>الحالة</th></tr></thead>
          <tbody>
            {shipments.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: "center", color: "#9CA3AF" }}>لا توجد شحنات علف مسجلة</td></tr>
            ) : (
              shipments.map((s, idx) => (
                <tr key={idx} style={{ cursor: "pointer" }} onClick={() => setSelectedTrader({ info: s.FeedSuppliers || { name: `مورد #${idx + 1}` }, roleLabel: "مورد علف", operations: [s] })}>
                  <td style={{ color: "#1F6E56", textDecoration: "underline" }}><strong>{s.FeedSuppliers?.name || s.feed_name || `شحنة #${idx + 1}`}</strong></td>
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

export default FeedSuppliersTable;
