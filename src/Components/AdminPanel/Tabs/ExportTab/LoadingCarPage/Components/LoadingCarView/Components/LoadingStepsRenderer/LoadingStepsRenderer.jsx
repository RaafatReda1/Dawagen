import Step1ImporterVehicle from "../../../Step1ImporterVehicle/Step1ImporterVehicle";
import Step2TareSection from "../../../Step2TareSection/Step2TareSection";
import Step3GrossSection from "../../../Step3GrossSection/Step3GrossSection";
import Step4PaymentsSection from "../../../Step4PaymentsSection/Step4PaymentsSection";

const LoadingStepsRenderer = ({ ctx, onAddTare, onRemoveTare, onAddGross, onRemoveGross, onAddPayment, onRemovePayment, onFinish }) => {
  const { activeStep, setActiveStep, form, setForm, tareWeights, grossWeights, role, importers, calculations, autoSave } = ctx;
  const isReadOnly = role !== "writer";
  const triggerAutoSave = () => autoSave({ form, tareWeights, grossWeights, broadcastChange: ctx.broadcastChange });

  if (activeStep === 1) {
    return <Step1ImporterVehicle form={form} setForm={setForm} importers={importers} onNext={() => setActiveStep(2)} onAutoSave={triggerAutoSave} />;
  }
  if (activeStep === 2) {
    return <Step2TareSection tareWeights={tareWeights} onAddTare={onAddTare} onRemoveTare={onRemoveTare} isReadOnly={isReadOnly} onNext={() => setActiveStep(3)} onPrev={() => setActiveStep(1)} />;
  }
  if (activeStep === 3) {
    return <Step3GrossSection grossWeights={grossWeights} onAddGross={onAddGross} onRemoveGross={onRemoveGross} crateCapacity={form.crate_capacity} isReadOnly={isReadOnly} onNext={() => setActiveStep(4)} onPrev={() => setActiveStep(2)} />;
  }
  return (
    <Step4PaymentsSection
      executionPrice={form.execution_price}
      onPriceChange={(val) => setForm((p) => ({ ...p, execution_price: val }))}
      payments={form.payments || []}
      onAddPayment={onAddPayment}
      onRemovePayment={onRemovePayment}
      calculations={calculations}
      isReadOnly={isReadOnly}
      isSubmitting={ctx.saveStatus === "saving"}
      onComplete={onFinish}
      onPrev={() => setActiveStep(3)}
      onAutoSave={triggerAutoSave}
    />
  );
};

export default LoadingStepsRenderer;
