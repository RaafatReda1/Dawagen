import { useState } from "react";
import SaleCardHeader from "./Components/SaleCardHeader/SaleCardHeader";
import SaleWeightsDetails from "./Components/SaleWeightsDetails/SaleWeightsDetails";
import SalePaymentsDetails from "./Components/SalePaymentsDetails/SalePaymentsDetails";
import {
  calculateTareTotal, calculateGrossTotal, calculateNetWeight,
  calculateSaleTotal, calculatePaymentsTotal, calculateRemaining
} from "../../../../Utils";
import styles from "./SaleCard.module.css";

const SaleCard = ({ sale, onEdit }) => {
  const [expanded, setExpanded] = useState(false);

  const tare = calculateTareTotal(sale.tare_weights);
  const gross = calculateGrossTotal(sale.gross_weights);
  const net = calculateNetWeight(gross, tare);
  const totalValue = calculateSaleTotal(net, sale.execution_price);
  const paid = calculatePaymentsTotal(sale.payments);
  const remaining = calculateRemaining(totalValue, paid);

  return (
    <div className={`${styles.card} ${expanded ? styles.expandedCard : ""}`}>
      <SaleCardHeader
        sale={sale}
        expanded={expanded}
        onToggle={() => setExpanded((p) => !p)}
        netWeight={net}
        totalValue={totalValue}
        paid={paid}
        remaining={remaining}
      />

      {expanded && (
        <div className={styles.body}>
          <SaleWeightsDetails
            tareWeights={sale.tare_weights || []}
            grossWeights={sale.gross_weights || []}
          />
          <SalePaymentsDetails
            payments={sale.payments || []}
            onEdit={() => onEdit(sale)}
          />
        </div>
      )}
    </div>
  );
};

export default SaleCard;
