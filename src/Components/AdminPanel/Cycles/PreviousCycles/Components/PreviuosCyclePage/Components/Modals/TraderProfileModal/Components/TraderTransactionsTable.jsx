import React from "react";
import styles from "./TraderTransactionsTable.module.css";

const TraderTransactionsTable = ({ transactions = [], roleLabel = "" }) => {
  const isTrader = roleLabel.includes("تصدير") || roleLabel.includes("تاجر");

  return (
    <div className={styles.tableWrapper}>
      <h4 className={styles.tableTitle}>تفاصيل السجل الحسابي والعمليات الفردية بالنظام</h4>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>تاريخ المعاملة</th><th>البيان</th>
              {isTrader && <th>القائم / الطبلة</th>}<th>الصافي والكمية</th>
              <th>سعر التنفيذ</th><th>الإجمالي</th><th>المدفوع</th><th>المتبقي</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr><td colSpan="8" className={styles.noData}>لا توجد معاملات مسجلة لهذا الحساب.</td></tr>
            ) : (
              transactions.map((t, idx) => (
                <tr key={t.id || idx}>
                  <td>{t.date || (t.created_at ? new Date(t.created_at).toLocaleDateString("ar-EG") : "-")}</td>
                  <td className={styles.bold}>{t.item || t.driver_name || "عملية مسجلة"}</td>
                  {isTrader && <td>DATA HERE!</td>}
                  <td><span className={styles.netBadge}>DATA HERE!</span></td>
                  <td>DATA HERE!</td>
                  <td className={styles.bold}>DATA HERE!</td>
                  <td className={styles.green}>DATA HERE!</td>
                  <td className={styles.green}>DATA HERE!</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TraderTransactionsTable;
