import React from "react";
import { formatEgp } from "../../../../../../../../utils/formatters";
import styles from "./SalesMeatSummaryCards.module.css";

const SalesMeatSummaryCards = ({ salesFinancials }) => {
  const totalNetKg = salesFinancials?.totalNetWeightSoldKg || 0;
  const totalTons = (totalNetKg / 1000).toFixed(2);
  const avgPrice = salesFinancials?.averagePricePerKg || 0;
  const totalImporters = salesFinancials?.importersList?.length || 0;
  const totalRevenue = salesFinancials?.totalSalesRevenue || 0;

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <span className={styles.label}>صافي لحم الدورة طلّعته</span>
        <span className={styles.value}>{totalTons} طن ({totalNetKg.toLocaleString()} كجم)</span>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>متوسط سعر الكيلو</span>
        <span className={styles.value}>{avgPrice} ج.م / كجم</span>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>عدد التجّار</span>
        <span className={styles.value}>{totalImporters} تاجر</span>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>إجمالي مبيعات المزرعة</span>
        <span className={styles.value} style={{ color: "#059669" }}>{formatEgp(totalRevenue)}</span>
      </div>
    </div>
  );
};

export default SalesMeatSummaryCards;
