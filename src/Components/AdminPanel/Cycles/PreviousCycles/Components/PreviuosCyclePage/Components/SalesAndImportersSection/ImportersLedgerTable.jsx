import React, { useState } from "react";
import TraderProfileModal from "../Modals/TraderProfileModal/TraderProfileModal";
import styles from "./ImportersLedgerTable.module.css";

const ImportersLedgerTable = ({ importersList = [] }) => {
  const [selectedTrader, setSelectedTrader] = useState(null);

  return (
    <div className={styles.card}>
      <div className={styles.header}>كشف حساب ومبيعات تجار الدواجن والتصدير</div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead><tr><th>اسم التاجر</th><th>صافي الوزن / الطيور</th><th>المبيعات</th><th>المدفوع</th><th>المتبقي</th><th>الحالة</th></tr></thead>
          <tbody>
            {importersList.length === 0 ? <tr><td colSpan="6" style={{ textAlign: "center", color: "#9CA3AF" }}>لا توجد مبيعات مسجلة للتجار</td></tr> : (
              importersList.map((imp, idx) => {
                const traderName = imp?.name || imp?.importerInfo?.name || `تاجر #${idx + 1}`;
                return (
                  <tr key={idx} style={{ cursor: "pointer" }} onClick={() => setSelectedTrader({ info: imp?.importerInfo || imp, roleLabel: "تاجر تصدير ودواجن", operations: [], totalVal: "DATA HERE!", totalPaid: "DATA HERE!", remainingDebt: "DATA HERE!", totalQtyText: "DATA HERE!" })}>
                    <td style={{ color: "#1F6E56", textDecoration: "underline" }}><strong>{traderName}</strong></td>
                    <td>DATA HERE!</td>
                    <td>DATA HERE!</td>
                    <td>DATA HERE!</td>
                    <td>DATA HERE!</td>
                    <td><span className={styles.badgePaid}>DATA HERE!</span></td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {selectedTrader && <TraderProfileModal traderData={selectedTrader} onClose={() => setSelectedTrader(null)} />}
    </div>
  );
};

export default ImportersLedgerTable;
