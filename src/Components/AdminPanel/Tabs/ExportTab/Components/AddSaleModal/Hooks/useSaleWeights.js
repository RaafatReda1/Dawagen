import { useState } from "react";
import { updateFarmSaleWeights } from "../../../Utils";

export const useSaleWeights = (saleId, initialTare = [], initialGross = [], onSaveLocal) => {
  const [tareWeights, setTareWeights] = useState(initialTare);
  const [grossWeights, setGrossWeights] = useState(initialGross);

  const addTareWeight = async (entry) => {
    const updated = [...tareWeights, entry];
    setTareWeights(updated);
    if (onSaveLocal) onSaveLocal("tare_weights", updated);
    if (saleId) {
      try { await updateFarmSaleWeights(saleId, { tare_weights: updated }); } catch (e) { /* offline fallback */ }
    }
  };

  const removeTareWeight = async (idx) => {
    const updated = tareWeights.filter((_, i) => i !== idx);
    setTareWeights(updated);
    if (onSaveLocal) onSaveLocal("tare_weights", updated);
    if (saleId) {
      try { await updateFarmSaleWeights(saleId, { tare_weights: updated }); } catch (e) { /* offline fallback */ }
    }
  };

  const addGrossWeight = async (entry) => {
    const updated = [...grossWeights, entry];
    setGrossWeights(updated);
    if (onSaveLocal) onSaveLocal("gross_weights", updated);
    if (saleId) {
      try { await updateFarmSaleWeights(saleId, { gross_weights: updated }); } catch (e) { /* offline fallback */ }
    }
  };

  const removeGrossWeight = async (idx) => {
    const updated = grossWeights.filter((_, i) => i !== idx);
    setGrossWeights(updated);
    if (onSaveLocal) onSaveLocal("gross_weights", updated);
    if (saleId) {
      try { await updateFarmSaleWeights(saleId, { gross_weights: updated }); } catch (e) { /* offline fallback */ }
    }
  };

  return { tareWeights, setTareWeights, grossWeights, setGrossWeights, addTareWeight, removeTareWeight, addGrossWeight, removeGrossWeight };
};

export default useSaleWeights;
