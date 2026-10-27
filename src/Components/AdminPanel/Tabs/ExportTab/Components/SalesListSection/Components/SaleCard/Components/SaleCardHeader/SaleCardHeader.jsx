import { Truck, ChevronDown, ChevronUp, User } from "lucide-react";
import { formatDateDisplay } from "../../../../../../Utils";
import styles from "./SaleCardHeader.module.css";

const SaleCardHeader = ({ sale, expanded, onToggle, netWeight, totalValue, paid, remaining }) => {
  const isPaidFull = paid >= totalValue && totalValue > 0;
  const isPartial = paid > 0 && paid < totalValue;

  return (
    <div className={styles.header} onClick={onToggle}>
      <div className={styles.mainInfo}>
        <div className={styles.iconBox}><Truck size={20} /></div>
        <div>
          <div className={styles.titleRow}>
            <h3 className={styles.importerName}>
              <User size={15} />
              {sale.Importers?.name || "تاجر غير محدد"}
            </h3>
            <span className={styles.vehicleType}>{sale.vehicle_type || "سيارة نصف نقل"}</span>
            <span className={styles.date}>{formatDateDisplay(sale.created_at)}</span>
          </div>
          <div className={styles.metricsRow}>
            <span>الأقفاص: <strong>{sale.crates_count || 0}</strong></span>
            <span>صافي الوزن: <strong>{netWeight.toLocaleString()} كجم</strong></span>
            <span>سعر الكيلو: <strong>{sale.execution_price || 0} ج.م</strong></span>
          </div>
        </div>
      </div>

      <div className={styles.summaryInfo}>
        <div className={styles.financials}>
          <span className={styles.total}>{totalValue.toLocaleString()} ج.م</span>
          <span className={`${styles.badge} ${isPaidFull ? styles.paidFull : isPartial ? styles.paidPartial : styles.unpaid}`}>
            {isPaidFull ? "خالص بالكامل" : isPartial ? `متبقي ${remaining.toLocaleString()} ج.م` : "آجل"}
          </span>
        </div>
        <button type="button" className={styles.arrowBtn}>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>
    </div>
  );
};

export default SaleCardHeader;
