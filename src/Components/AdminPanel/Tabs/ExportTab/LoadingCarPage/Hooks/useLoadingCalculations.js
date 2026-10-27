import { useMemo } from "react";
import {
  calculateTareTotal,
  calculateGrossTotal,
  calculateNetWeight,
  calculateSaleTotal,
  calculatePaymentsTotal,
  calculateRemaining,
} from "../../Utils";
import {
  calculateGrossChicksTotal,
  calculateAvgBirdWeight,
} from "../Utils/chicksCalculations";

export const useLoadingCalculations = (form, tareWeights, grossWeights) => {
  return useMemo(() => {
    const tareTotal = calculateTareTotal(tareWeights);
    const grossTotal = calculateGrossTotal(grossWeights);
    const netWeight = calculateNetWeight(grossTotal, tareTotal);
    const chicksTotal = calculateGrossChicksTotal(grossWeights, form.crate_capacity);
    const avgBirdWeight = calculateAvgBirdWeight(netWeight, chicksTotal);
    const totalValue = calculateSaleTotal(netWeight, form.execution_price);
    const paidTotal = calculatePaymentsTotal(form.payments);
    const remaining = calculateRemaining(totalValue, paidTotal);

    return {
      tareTotal,
      grossTotal,
      netWeight,
      chicksTotal,
      avgBirdWeight,
      totalValue,
      paidTotal,
      remaining,
    };
  }, [form, tareWeights, grossWeights]);
};

export default useLoadingCalculations;
