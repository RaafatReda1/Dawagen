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

  if (loading) {
    return <CycleLoader progress={70} stepMessage={`جاري جلب بيانات الدورة رقم ${cycleId}...`} />;
  }

  const cycle = rawData?.cycle || {};

  return (
    <div className={styles.pageContainer}>
      <CyclePageHeader cycleId={cycleId} chickType={cycle.chick_type} startDate={cycle.started_at} endDate={cycle.ended_at} onBack={onBack} />
      <SalesMeatSummaryCards />
      <div className={styles.twoColumnGrid}>
        <div>
          <FeedConsumptionSummary feedFinancials={metrics?.feedFinancials} />
          <FeedSuppliersTable shipments={rawData?.feedShipments} />
          <DiseasesAndMedsChart medicineFinancials={metrics?.medicineFinancials} />
          <MedicineSuppliersTable invoices={rawData?.medicineInvoices} />
        </div>
        <div>
          <MortalityLossChart chickFinancials={metrics?.chickFinancials} />
          <CumulativeExpensesChart chickFinancials={metrics?.chickFinancials} />
          <ImportersLedgerTable importersList={rawData?.importers} />
          <MetaDataBorsaChart metaData={rawData?.metaData} />
        </div>
      </div>
      <CycleAiReportCard />
    </div>
  );
};

export default PreviuosCyclePage;