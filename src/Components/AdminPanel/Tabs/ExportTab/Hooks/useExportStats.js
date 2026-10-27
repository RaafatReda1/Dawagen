import { useMemo } from "react";
import {
  calculateTareTotal, calculateGrossTotal,
  calculateNetWeight, calculateSaleTotal,
  calculatePaymentsTotal, calculateRemaining
} from "../Utils";

export const useExportStats = (sales = []) => {
  return useMemo(() => {
    let totalGross = 0;
    let totalTare = 0;
    let totalSalesValue = 0;
    let totalPaid = 0;

    sales.forEach((s) => {
      const tare = calculateTareTotal(s.tare_weights);
      const gross = calculateGrossTotal(s.gross_weights);
      const net = calculateNetWeight(gross, tare);
      const saleValue = calculateSaleTotal(net, s.execution_price);
      const paid = calculatePaymentsTotal(s.payments);

      totalTare += tare;
      totalGross += gross;
      totalSalesValue += saleValue;
      totalPaid += paid;
    });

    const totalNetWeight = calculateNetWeight(totalGross, totalTare);
    const totalRemaining = calculateRemaining(totalSalesValue, totalPaid);

    return {
      totalVehicles: sales.length,
      totalTare,
      totalGross,
      totalNetWeight,
      totalSalesValue,
      totalPaid,
      totalRemaining,
    };
  }, [sales]);
};

export default useExportStats;
