import React from "react";
import FinancialHeroHeader from "./FinancialHeroHeader";
import SalesHeroCard from "./SalesHeroCard";
import ExpensesCard from "./ExpensesCard";
import FinancialRatioFooter from "./FinancialRatioFooter";
import styles from "./FinancialHeroBlock.module.css";

const FinancialHeroBlock = () => {
  return (
    <div className={styles.container}>
      <FinancialHeroHeader />
      <div className={styles.stage}>
        <SalesHeroCard />
        <ExpensesCard />
      </div>
      <FinancialRatioFooter />
    </div>
  );
};

export default FinancialHeroBlock;
