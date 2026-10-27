export const useLoadingActions = (ctx) => {
  const addTare = (entry) => {
    const updated = [...ctx.tareWeights, entry];
    ctx.setTareWeights(updated);
    ctx.autoSave({ form: ctx.form, tareWeights: updated, grossWeights: ctx.grossWeights, broadcastChange: ctx.broadcastChange });
  };

  const removeTare = (idx) => {
    const updated = ctx.tareWeights.filter((_, i) => i !== idx);
    ctx.setTareWeights(updated);
    ctx.autoSave({ form: ctx.form, tareWeights: updated, grossWeights: ctx.grossWeights, broadcastChange: ctx.broadcastChange });
  };

  const addGross = (entry) => {
    const updated = [...ctx.grossWeights, entry];
    ctx.setGrossWeights(updated);
    ctx.autoSave({ form: ctx.form, tareWeights: ctx.tareWeights, grossWeights: updated, broadcastChange: ctx.broadcastChange });
  };

  const removeGross = (idx) => {
    const updated = ctx.grossWeights.filter((_, i) => i !== idx);
    ctx.setGrossWeights(updated);
    ctx.autoSave({ form: ctx.form, tareWeights: ctx.tareWeights, grossWeights: updated, broadcastChange: ctx.broadcastChange });
  };

  const addPayment = (p) => {
    const updatedForm = { ...ctx.form, payments: [...(ctx.form.payments || []), p] };
    ctx.setForm(updatedForm);
    ctx.autoSave({ form: updatedForm, tareWeights: ctx.tareWeights, grossWeights: ctx.grossWeights, broadcastChange: ctx.broadcastChange });
  };

  const removePayment = (idx) => {
    const updatedForm = { ...ctx.form, payments: (ctx.form.payments || []).filter((_, i) => i !== idx) };
    ctx.setForm(updatedForm);
    ctx.autoSave({ form: updatedForm, tareWeights: ctx.tareWeights, grossWeights: ctx.grossWeights, broadcastChange: ctx.broadcastChange });
  };

  return { addTare, removeTare, addGross, removeGross, addPayment, removePayment };
};

export default useLoadingActions;
