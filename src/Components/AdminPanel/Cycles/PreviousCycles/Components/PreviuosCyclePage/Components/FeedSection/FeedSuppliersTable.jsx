import React, { useState, useMemo } from "react";
import { formatEgp } from "../../../../../../../../utils/formatters";
import TraderProfileModal from "../Modals/TraderProfileModal/TraderProfileModal";
import styles from "./FeedSuppliersTable.module.css";

const FeedSuppliersTable = ({ shipments = [] }) => {
  const [selectedTrader, setSelectedTrader] = useState(null);

  const supplierGroups = useMemo(() => {
    const map = new Map();
    shipments.forEach((s) => {
      const supId = s.supplier_id || s.FeedSuppliers?.id || "unknown";
      if (!map.has(supId)) {
        map.set(supId, {
          info: s.FeedSuppliers || { name: `مورد علف #${supId}` },
          roleLabel: "مورد علف",
          operations: [],
          totalVal: 0,
          totalPaid: 0,
          remainingDebt: 0,
          totalSacks: 0,
        });
      }
      const group = map.get(supId);
      group.operations.push(s);
      group.totalVal += Number(s.calculatedTotal || 0);
      group.totalPaid += Number(s.calculatedPaid || 0);
      group.remainingDebt += Number(s.calculatedDebt || 0);
      group.totalSacks += Number(s.sacks_count || 0);
    });
    return Array.from(map.values()).map((g) => ({
      ...g,
      totalQtyText: `${g.totalSacks} شكارة (${(g.totalSacks * 50 / 1000).toFixed(2)} طن)`,
    }));
  }, [shipments]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>كشف حساب تجار وموردي الأعلاف</div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead><tr><th>اسم المورد</th><th>الكميات المسحوبة</th><th>الإجمالي</th><th>المدفوع</th><th>الحالة</th></tr></thead>
          <tbody>
            {supplierGroups.length === 0 ? <tr><td colSpan="5" style={{ textAlign: "center", color: "#9CA3AF" }}>لا توجد شحنات علف مسجلة</td></tr> : (
              supplierGroups.map((group, idx) => (
                <tr key={idx} style={{ cursor: "pointer" }} onClick={() => setSelectedTrader(group)}>
                  <td style={{ color: "#1F6E56", textDecoration: "underline" }}><strong>{group.info?.name || `مورد علف #${idx + 1}`}</strong></td>
                  <td>{group.totalQtyText}</td>
                  <td>{formatEgp(group.totalVal)}</td>
                  <td>{formatEgp(group.totalPaid)}</td>
                  <td><span className={group.remainingDebt > 0 ? styles.badgeUnpaid : styles.badgePaid}>{group.remainingDebt > 0 ? `متبقي ${formatEgp(group.remainingDebt)}` : "حساب خلصان"}</span></td>
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
