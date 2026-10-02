import React from "react";
import TraderHeader from "./Components/TraderHeader";
import TraderPhoneActions from "./Components/TraderPhoneActions";
import TraderSummaryGrid from "./Components/TraderSummaryGrid";
import TraderHistoryChart from "./Components/TraderHistoryChart";
import TraderTransactionsTable from "./Components/TraderTransactionsTable";
import styles from "./TraderProfileModal.module.css";

const TraderProfileModal = ({ traderData, onClose }) => {
  if (!traderData) return null;
  const { info = {}, roleLabel = "تاجر", operations = [], totalRevenue, totalVal, totalPaid, remainingDebt, totalQtyText = "-" } = traderData;

  const phoneNumbers = Array.isArray(info.phone_number) ? info.phone_number : [info.phone_number?.phone || info.phone_number || info.phone || info.contact_phone].filter(Boolean);

  const calcVal = (totalVal !== undefined && totalVal !== 0) ? totalVal : (totalRevenue !== undefined && totalRevenue !== 0 ? totalRevenue : operations.reduce((sum, o) => sum + (o.calculatedRevenue || o.calculatedTotal || o.total_price || o.total || o.amount || 0), 0));
  const calcPaid = (totalPaid !== undefined && totalPaid !== 0) ? totalPaid : operations.reduce((sum, o) => sum + (o.calculatedCollected || o.calculatedPaid || o.paid || 0), 0);
  const calcDebt = (remainingDebt !== undefined) ? remainingDebt : Math.max(0, calcVal - calcPaid);

  const stats = { totalQtyText, totalVal: calcVal, totalPaid: calcPaid, remaining: calcDebt };

  const chartData = operations.map((op, idx) => ({
    date: op.date || (op.created_at ? new Date(op.created_at).toLocaleDateString("ar-EG") : `عملية #${idx + 1}`),
    total: op.calculatedRevenue || op.calculatedTotal || op.total_price || op.total || op.amount || 0,
    paid: op.calculatedCollected || op.calculatedPaid || op.paid || 0
  }));

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <TraderHeader traderData={traderData} onClose={onClose} />
        <div className={styles.metaRow}>
          <span>العنوان: {info.place || info.address || "غير محدد"}</span>
          <TraderPhoneActions phoneNumbers={phoneNumbers} />
        </div>
        <TraderSummaryGrid stats={stats} />
        <TraderHistoryChart chartData={chartData} />
        <TraderTransactionsTable transactions={operations} roleLabel={roleLabel} />
      </div>
    </div>
  );
};

export default TraderProfileModal;
