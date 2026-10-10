import React from "react";
import FinancialHeroBlock from "./Components/FinancialHeroBlock/FinancialHeroBlock";
import NetMeatCard from "./Components/NetMeatCard/NetMeatCard";
import CratesAndChicksCard from "./Components/CratesAndChicksCard/CratesAndChicksCard";
import ImportersCard from "./Components/ImportersCard/ImportersCard";
import ExecutionPriceCard from "./Components/ExecutionPriceCard/ExecutionPriceCard";
import styles from "./SalesMeatSummaryCards.module.css";

const SalesMeatSummaryCards = ({ salesFinancials = {}, metrics = {} }) => {
  const revenue = salesFinancials?.totalSalesRevenue ?? metrics?.cards?.totalSalesRevenue ?? 0;
  const expenses = metrics?.cards?.totalCycleCost ?? 0;
  const collected = salesFinancials?.totalSalesCollected ?? 0;
  const receivables = salesFinancials?.totalSalesReceivables ?? 0;

  const netKg = Number(salesFinancials?.totalNetWeightSoldKg) || 0;
  const grossKg = Number(salesFinancials?.totalGrossWeightKg) || 0;
  const tareKg = Number(salesFinancials?.totalTareWeightKg) || 0;

  const crates = Number(salesFinancials?.totalCratesSold) || 0;
  const birds = Number(salesFinancials?.totalBirdsSold) || 0;
  const avgBirdWeight = birds > 0 && netKg > 0 ? (netKg / birds).toFixed(2) : null;
  const birdsPerCrate = crates > 0 && birds > 0 ? (birds / crates).toFixed(1) : null;

  const importers = salesFinancials?.importersList || [];
  const avgPrice = salesFinancials?.averagePricePerKg || (netKg > 0 ? parseFloat((revenue / netKg).toFixed(1)) : 0);

  return (
    <section className={styles.sectionContainer} aria-label="ملخص المبيعات والإنتاج">
      <FinancialHeroBlock revenue={revenue} expenses={expenses} collected={collected} receivables={receivables} />
      <div className={styles.operationalGrid}>
        <NetMeatCard netKg={netKg} grossKg={grossKg} tareKg={tareKg} />
        <CratesAndChicksCard crates={crates} birds={birds} avgBirdWeight={avgBirdWeight} birdsPerCrate={birdsPerCrate} />
        <ImportersCard importers={importers} />
        <ExecutionPriceCard avgPrice={avgPrice} revenue={revenue} collected={collected} />
      </div>
    </section>
  );
};

export default SalesMeatSummaryCards;
