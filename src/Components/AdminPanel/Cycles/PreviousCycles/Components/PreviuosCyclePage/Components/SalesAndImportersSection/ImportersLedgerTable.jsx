import React, { useState } from "react";
import { formatEgp } from "../../../../../../../../utils/formatters";
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
                const birdsStr = imp.totalBirdsSold ? `${imp.totalBirdsSold.toLocaleString()} طير` : "";
                const qtyText = `${imp.totalNetWeightSold.toLocaleString()} كجم ${birdsStr ? `(${birdsStr})` : ""}`;
                return (
                  <tr key={idx} style={{ cursor: "pointer" }} onClick={() => setSelectedTrader({ info: imp.importerInfo, roleLabel: "تاجر تصدير ودواجن", operations: imp.salesOperations, totalVal: imp.totalRevenue, totalPaid: imp.totalPaid, remainingDebt: imp.remainingDebt, totalQtyText: qtyText })}>
                    <td style={{ color: "#1F6E56", textDecoration: "underline" }}><strong>{imp.importerInfo?.name || `تاجر #${idx + 1}`}</strong></td>
                    <td>{qtyText}</td>
                    <td>{formatEgp(imp.totalRevenue)}</td>
                    <td>{formatEgp(imp.totalPaid)}</td>
                    <td>{formatEgp(imp.remainingDebt)}</td>
                    <td><span className={imp.hasUnpaidBalance ? styles.badgeUnpaid : styles.badgePaid}>{imp.hasUnpaidBalance ? `متبقي ${formatEgp(imp.remainingDebt)}` : "مسدد بالكامل"}</span></td>
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
