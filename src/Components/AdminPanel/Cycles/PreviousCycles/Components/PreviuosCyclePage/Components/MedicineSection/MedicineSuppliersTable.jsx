import React, { useState, useMemo } from "react";
import { formatEgp } from "../../../../../../../../utils/formatters";
import TraderProfileModal from "../Modals/TraderProfileModal/TraderProfileModal";
import styles from "./MedicineSuppliersTable.module.css";

const MedicineSuppliersTable = ({ invoices = [] }) => {
  const [selectedTrader, setSelectedTrader] = useState(null);

  const supplierGroups = useMemo(() => {
    const map = new Map();
    invoices.forEach((inv) => {
      const supId = inv.supplier_id || inv.MedicineSuppliers?.id || "unknown";
      if (!map.has(supId)) {
        map.set(supId, {
          info: inv.MedicineSuppliers || { name: `مورد أدوية #${supId}` },
          roleLabel: "صيدلية / مورد أدوية بيطرية",
          operations: [],
          totalVal: 0,
          totalPaid: 0,
          remainingDebt: 0,
        });
      }
      const group = map.get(supId);
      group.operations.push(inv);
      group.totalVal += Number(inv.calculatedTotal || inv.total_price || 0);
      group.totalPaid += Number(inv.calculatedPaid || 0);
      group.remainingDebt += Number(inv.calculatedDebt || 0);
    });
    return Array.from(map.values()).map((g) => ({
      ...g,
      totalQtyText: `${g.operations.length} فاتورة مسحوبات`,
    }));
  }, [invoices]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>كشف حساب الصيدليات وموردي الأدوية</div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead><tr><th>اسم الصيدلية / المورد</th><th>الفواتير</th><th>الإجمالي</th><th>المدفوع</th><th>الديون المتبقية</th><th>الحالة</th></tr></thead>
          <tbody>
            {supplierGroups.length === 0 ? <tr><td colSpan="6" style={{ textAlign: "center", color: "#9CA3AF" }}>لا توجد ديون أو مسحوبات أدوية</td></tr> : (
              supplierGroups.map((group, idx) => (
                <tr key={idx} style={{ cursor: "pointer" }} onClick={() => setSelectedTrader(group)}>
                  <td style={{ color: "#1F6E56", textDecoration: "underline" }}><strong>{group.info?.name || `مورد أدوية #${idx + 1}`}</strong></td>
                  <td>{group.totalQtyText}</td>
                  <td>{formatEgp(group.totalVal)}</td>
                  <td>{formatEgp(group.totalPaid)}</td>
                  <td>{formatEgp(group.remainingDebt)}</td>
                  <td><span className={group.remainingDebt > 0 ? styles.badgeUnpaid : styles.badgePaid}>{group.remainingDebt > 0 ? "آجل / متبقي حساب" : "خالص بالتكامل"}</span></td>
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
