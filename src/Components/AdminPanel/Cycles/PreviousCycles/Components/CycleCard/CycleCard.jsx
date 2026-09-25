import React from "react";
import useCycleDetails from "../../../../../../hooks/useCycleDetails";
import CycleHeader from "./Components/Header/CycleHeader";
import SummaryBanner from "./Components/SummaryBanner/SummaryBanner";
import FinancialDetails from "./Components/FinancialDetails/FinancialDetails";
import ReceivablesSection from "./Components/ReceivablesSection/ReceivablesSection";
import ChequeDetails from "./Components/ChequeDetails/ChequeDetails";
import ProfitLossFooter from "./Components/ProfitLossFooter/ProfitLossFooter";
import ActionButton from "./Components/ActionButton/ActionButton";
import styles from "./CycleCard.module.css";

const CycleCard = ({ cycle }) => {
  const { metrics } = useCycleDetails(cycle?.id);

  const cycleNumber = cycle?.id || 1;
  const chickType = cycle?.chick_type || "Cobb 500";
  const startDate = cycle?.started_at ? new Date(cycle.started_at).toLocaleDateString("ar-EG") : "14 سبتمبر 2026";
  const endDate = cycle?.ended_at ? new Date(cycle.ended_at).toLocaleDateString("ar-EG") : "28 ديسمبر 2026";
  const isActive = cycle?.is_active ?? false;
  const durationDays = 43;

  const totalRevenue = metrics?.cards?.totalSalesRevenue ?? 90000;
  const totalExpenses = metrics?.cards?.totalCycleCost ?? 60000;
  const netProfitLoss = metrics?.cards?.netProfitLoss ?? 30000;
  const receivablesOwed = metrics?.cards?.receivablesOwed ?? 50000;
  const debtsOwed = metrics?.cards?.debtsOwed ?? 30000;
  const chickCost = metrics?.chickFinancials?.chickCost ?? 40000;
  const soldChickCost = metrics?.salesFinancials?.totalSalesRevenue ?? 90000;

  return (
    <div className={styles.cardContainer}>
      <CycleHeader cycleNumber={cycleNumber} chickType={chickType} startDate={startDate} endDate={endDate} durationDays={durationDays} isActive={isActive} />
      <SummaryBanner totalRevenue={totalRevenue} totalExpenses={totalExpenses} netProfitLoss={netProfitLoss} />
      <FinancialDetails totalRevenue={totalRevenue} totalExpenses={totalExpenses} netProfitLoss={netProfitLoss} />
      <ReceivablesSection receivablesOwed={receivablesOwed} debtsOwed={debtsOwed} />
      <ChequeDetails chickCost={chickCost} soldChickCost={soldChickCost} />
      <ProfitLossFooter netProfitLoss={netProfitLoss} />
      <ActionButton cycleId={cycleNumber} />
    </div>
  );
};

export default CycleCard;