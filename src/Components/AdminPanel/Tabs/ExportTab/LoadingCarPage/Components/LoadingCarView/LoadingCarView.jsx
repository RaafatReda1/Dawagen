import { useLoadingContext } from "../../Contexts/LoadingSessionContext";
import { useLoadingActions } from "../../Hooks/useLoadingActions";
import LoadingHeader from "../LoadingHeader/LoadingHeader";
import SyncStatusBanner from "../SyncStatusBanner/SyncStatusBanner";
import ReconciliationModal from "../ReconciliationModal/ReconciliationModal";
import SummaryMetricsBar from "../SummaryMetricsBar/SummaryMetricsBar";
import SectionTabs from "../SectionTabs/SectionTabs";
import LoadingStepsRenderer from "./Components/LoadingStepsRenderer/LoadingStepsRenderer";
import styles from "./LoadingCarView.module.css";

const LoadingCarView = ({ onSelectSession, onNewSession, onFinish }) => {
  const ctx = useLoadingContext();
  const acts = useLoadingActions(ctx);
  const selectedImp = ctx.importers.find((i) => String(i.id) === String(ctx.form.importer_id));

  return (
    <div className={styles.page}>
      <LoadingHeader importerName={selectedImp?.name || ctx.form.new_name} activeLoadings={ctx.activeLoadings} currentSaleId={ctx.saleId} onSelectSession={onSelectSession} onNewSession={onNewSession} onClose={ctx.onClose} />
      <SyncStatusBanner role={ctx.role} activeUsersCount={ctx.activeUsersCount} saveStatus={ctx.saveStatus} onClaimWriter={ctx.claimWriter} />
      <SummaryMetricsBar calculations={ctx.calculations} />
      <SectionTabs activeStep={ctx.activeStep} onSelectStep={ctx.setActiveStep} tareCount={ctx.tareWeights.length} grossCount={ctx.grossWeights.length} />
      <LoadingStepsRenderer ctx={ctx} onAddTare={acts.addTare} onRemoveTare={acts.removeTare} onAddGross={acts.addGross} onRemoveGross={acts.removeGross} onAddPayment={acts.addPayment} onRemovePayment={acts.removePayment} onFinish={onFinish} />
      <ReconciliationModal isOpen={ctx.isModalOpen} conflictData={ctx.conflictData} onRestoreLocal={() => { ctx.setForm(ctx.conflictData.local.form); ctx.setTareWeights(ctx.conflictData.local.tareWeights); ctx.setGrossWeights(ctx.conflictData.local.grossWeights); ctx.dismiss(); }} onKeepServer={() => { ctx.clearDraft(); ctx.dismiss(); }} />
    </div>
  );
};

export default LoadingCarView;
