import React from "react";
import styles from "./TraderTransactionsTable.module.css";

const TraderTransactionsTable = ({ transactions = [], roleLabel = "" }) => {
  const isTrader = roleLabel.includes("تصدير") || roleLabel.includes("تاجر");
  const isFeed = roleLabel.includes("علف");

  return (
    <div className={styles.tableWrapper}>
      <h4 className={styles.tableTitle}>تفاصيل السجل الحسابي والعمليات الفردية بالنظام</h4>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{isTrader ? "تاريخ البيع" : isFeed ? "تاريخ الشحنة" : "تاريخ الفاتورة"}</th><th>البيان والسائق</th>
              {isTrader && <th>القائم / الطبلة</th>}<th>{isTrader ? "الصافي وعدد الطيور" : isFeed ? "الكمية (شكائر/أطنان)" : "أصناف الفاتورة"}</th>
              <th>{isTrader ? "سعر التنفيذ" : isFeed ? "سعر الشكارة" : "-"}</th><th>الإجمالي</th><th>المدفوع</th><th>المتبقي</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr><td colSpan="8" className={styles.noData}>لا توجد معاملات مسجلة لهذا الحساب.</td></tr>
            ) : (
              transactions.map((t, idx) => {
                const dateStr = t.date || (t.created_at ? new Date(t.created_at).toLocaleDateString("ar-EG") : "-");
                const gross = Math.round(Number(t.calculatedGrossWeight || t.gross_weights || 0));
                const tare = Math.round(Number(t.calculatedTareWeight || t.tare_weights || 0));
                const net = Math.round(Number(t.calculatedNetWeight || t.net_weight || 0));
                const birds = Number(t.calculatedBirdsCount || t.chick_count || t.bird_count || 0) || (Number(t.crates_count || 0) * Number(t.crate_capacity || 0));
                const price = Number(t.executionPrice || t.execution_price || t.sack_price || 0);
                const total = Math.round(Number(t.calculatedRevenue || t.calculatedTotal || t.total_price || t.total || 0));
                const paid = Math.round(Number(t.calculatedCollected || t.calculatedPaid || t.paid || 0));
                const debt = Math.round(Number(t.calculatedRemainingDebt || t.calculatedDebt || t.remaining || Math.max(0, total - paid)));
                const desc = t.item || t.feed_name || (t.driver_name ? `سيارة: ${t.car_number || "-"} (${t.driver_name})` : (Array.isArray(t.Medicine) && t.Medicine.length ? t.Medicine.map(m=>m.name||m.medicine_name).join("، ") : "عملية مسجلة"));
                const netText = isTrader ? `${net.toLocaleString()} كجم ${birds ? `(${birds.toLocaleString()} طير)` : ""}` : (t.sacks_count ? `${t.sacks_count} شكارة (${(t.sacks_count * 50 / 1000).toFixed(1)} طن)` : "-");

                return (
                  <tr key={t.id || idx}>
                    <td>{dateStr}</td><td className={styles.bold}>{desc}</td>
                    {isTrader && <td>{gross && tare ? `${gross.toLocaleString()} / ${tare.toLocaleString()} كجم` : "-"}</td>}
                    <td><span className={styles.netBadge}>{netText}</span></td>
                    <td>{price ? `${price.toFixed(2)} EGP` : "-"}</td>
                    <td className={styles.bold}>{total ? `${total.toLocaleString()} EGP` : "0"}</td>
                    <td className={styles.green}>{paid ? `${paid.toLocaleString()} EGP` : "0"}</td>
                    <td className={debt > 0 ? styles.red : styles.green}>{debt ? `${debt.toLocaleString()} EGP` : "0"}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TraderTransactionsTable;
