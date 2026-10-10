import React from "react";
import FinancialHeroBlock from "./Components/FinancialHeroBlock/FinancialHeroBlock";
import NetMeatCard from "./Components/NetMeatCard/NetMeatCard";
import CratesAndChicksCard from "./Components/CratesAndChicksCard/CratesAndChicksCard";
import ImportersCard from "./Components/ImportersCard/ImportersCard";
import ExecutionPriceCard from "./Components/ExecutionPriceCard/ExecutionPriceCard";
import styles from "./SalesMeatSummaryCards.module.css";

const SalesMeatSummaryCards = () => {
  return (
    <section className={styles.sectionContainer} aria-label="ملخص المبيعات والإنتاج">
      <FinancialHeroBlock />
      <div className={styles.operationalGrid}>
        <NetMeatCard />
        <CratesAndChicksCard />
        <ImportersCard />
        <ExecutionPriceCard />
      </div>
    </section>
  );
};

export default SalesMeatSummaryCards;
