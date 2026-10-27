import { DollarSign, Scale, Truck, CheckCircle2, AlertTriangle, Layers } from "lucide-react";
import { useExport } from "../../Contexts/ExportContext";
import StatCard from "./Components/StatCard/StatCard";
import styles from "./ExportOverview.module.css";

const ExportOverview = () => {
  const { stats } = useExport();

  return (
    <div className={styles.grid}>
      <StatCard
        title="إجمالي قيمة المبيعات"
        value={stats.totalSalesValue.toLocaleString()}
        unit="ج.م"
        subtitle={`من إجمالي ${stats.totalVehicles} سيارات`}
        icon={DollarSign}
        color="green"
      />
      <StatCard
        title="الوزن الصافي المباع"
        value={stats.totalNetWeight.toLocaleString(undefined, { maximumFractionDigits: 1 })}
        unit="كجم"
        subtitle={`فارغ: ${stats.totalTare.toLocaleString()} كجم`}
        icon={Scale}
        color="blue"
      />
      <StatCard
        title="المبالغ المحصلة"
        value={stats.totalPaid.toLocaleString()}
        unit="ج.م"
        subtitle="إجمالي النقدية والتحويلات"
        icon={CheckCircle2}
        color="purple"
      />
      <StatCard
        title="المتبقي آجل على التجار"
        value={stats.totalRemaining.toLocaleString()}
        unit="ج.م"
        subtitle={stats.totalRemaining > 0 ? "مستحقات واجبة التحصيل" : "لا توجد مديونيات"}
        icon={AlertTriangle}
        color={stats.totalRemaining > 0 ? "rose" : "green"}
      />
    </div>
  );
};

export default ExportOverview;
