import React from "react";
import useCycleDetails from "../../../../../../hooks/useCycleDetails";
import CycleLoader from "../CycleLoader/CycleLoader";
import CyclePageHeader from "./Components/Header/CyclePageHeader";
import FeedConsumptionSummary from "./Components/FeedSection/FeedConsumptionSummary";
import FeedSuppliersTable from "./Components/FeedSection/FeedSuppliersTable";
import DiseasesAndMedsChart from "./Components/MedicineSection/DiseasesAndMedsChart";
import MedicineSuppliersTable from "./Components/MedicineSection/MedicineSuppliersTable";
import MortalityLossChart from "./Components/MortalitySection/MortalityLossChart";
import CumulativeExpensesChart from "./Components/DailyExpensesSection/CumulativeExpensesChart";
import SalesMeatSummaryCards from "./Components/SalesAndImportersSection/SalesMeatSummaryCards";
import ImportersLedgerTable from "./Components/SalesAndImportersSection/ImportersLedgerTable";
import MetaDataBorsaChart from "./Components/MetaDataBorsaSection/MetaDataBorsaChart";
import CycleAiReportCard from "./Components/AiReportSection/CycleAiReportCard";
import styles from "./PreviuosCyclePage.module.css";

const PreviuosCyclePage = ({ cycleId, onBack }) => {
  const { rawData, metrics, loading } = useCycleDetails(cycleId);

  if (loading || !metrics) {
    return <CycleLoader progress={70} stepMessage={`جاري جلب وحساب القوائم المالية للدورة رقم ${cycleId}...`} />;
  }

  const cycle = metrics.raw?.cycle || {};

  return (
    <div className={styles.pageContainer}>
      <CyclePageHeader cycleId={cycleId} chickType={cycle.chick_type || "Unknown"} chicksCount={cycle.number_of_chicks || "Undefined"} chickPrice={cycle.chick_price} chickCost={metrics.chickFinancials?.chickCost} startDate={cycle.started_at ? new Date(cycle.started_at).toLocaleDateString("ar-EG") : "Unknown"} endDate={cycle.ended_at ? new Date(cycle.ended_at).toLocaleDateString("ar-EG") : "Unknown"} durationDays={30} onBack={onBack} metrics={metrics} />
      <SalesMeatSummaryCards salesFinancials={metrics.salesFinancials} metrics={metrics} />
      <div className={styles.twoColumnGrid}>
        <div>
          <FeedConsumptionSummary feedFinancials={metrics.feedFinancials} />
          <FeedSuppliersTable shipments={metrics.feedFinancials?.shipments} />
          <DiseasesAndMedsChart medicineFinancials={metrics.medicineFinancials} />
          <MedicineSuppliersTable invoices={metrics.medicineFinancials?.invoices} />
        </div>
        <div>
          <MortalityLossChart chickFinancials={metrics.chickFinancials} />
          <CumulativeExpensesChart dailyExpensesFinancials={metrics.dailyExpensesFinancials} chickFinancials={metrics.chickFinancials} />
          <ImportersLedgerTable importersList={metrics.salesFinancials?.importersList} />
          <MetaDataBorsaChart metaData={rawData?.metaData} salesFinancials={metrics.salesFinancials} />
        </div>
      </div>
      <CycleAiReportCard metrics={metrics} />
    </div>
  );
};

export default PreviuosCyclePage;