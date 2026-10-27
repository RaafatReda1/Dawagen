import { useExport } from "../../Contexts/ExportContext";
import { useAddSaleModal } from "./Hooks/useAddSaleModal";
import { useSaleSubmit } from "./Hooks/useSaleSubmit";
import ModalHeader from "./Components/ModalHeader/ModalHeader";
import StepIndicator from "./Components/StepIndicator/StepIndicator";
import Step1Importer from "./Components/Step1Importer/Step1Importer";
import Step2Vehicle from "./Components/Step2Vehicle/Step2Vehicle";
import Step3TareWeights from "./Components/Step3TareWeights/Step3TareWeights";
import Step4GrossWeights from "./Components/Step4GrossWeights/Step4GrossWeights";
import Step5SummaryPayments from "./Components/Step5SummaryPayments/Step5SummaryPayments";
import DraftConfirmModal from "../../../../Common/DraftConfirmModal/DraftConfirmModal";
import styles from "./AddSaleModal.module.css";

const AddSaleModal = () => {
  const { isAddModalOpen } = useExport();
  const m = useAddSaleModal();
  const { handleSubmit } = useSaleSubmit(m);

  if (!isAddModalOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={m.handleCloseAttempt} />
      <div className={styles.modal}>
        <ModalHeader isEdit={!!m.saleId} onClose={m.handleCloseAttempt} />
        <StepIndicator currentStep={m.step} onSelectStep={m.setStep} />
        <div className={styles.content}>
          {m.step === 1 && <Step1Importer form={m.form} setForm={m.setForm} onChange={m.handleChange} importers={m.importers} onNext={() => m.setStep(2)} notify={m.notify} />}
          {m.step === 2 && <Step2Vehicle form={m.form} onChange={m.handleChange} onNext={() => m.setStep(3)} onPrev={() => m.setStep(1)} notify={m.notify} />}
          {m.step === 3 && <Step3TareWeights weights={m.weights} onNext={() => m.setStep(4)} onPrev={() => m.setStep(2)} notify={m.notify} />}
          {m.step === 4 && <Step4GrossWeights weights={m.weights} onNext={() => m.setStep(5)} onPrev={() => m.setStep(3)} notify={m.notify} />}
          {m.step === 5 && <Step5SummaryPayments form={m.form} setForm={m.setForm} weights={m.weights} onSubmit={handleSubmit} onPrev={() => m.setStep(4)} isSubmitting={m.isSubmitting} notify={m.notify} />}
        </div>
      </div>
      <DraftConfirmModal isOpen={m.showDraftModal} onSaveDraft={m.handleSaveDraft} onDiscard={m.handleDiscard} onCancel={() => m.setShowDraftModal(false)} />
    </>
  );
};

export default AddSaleModal;
