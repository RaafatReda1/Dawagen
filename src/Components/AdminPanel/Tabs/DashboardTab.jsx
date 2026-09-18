import { useCycles } from "../Cycles/Context/CycleContext";
import ActiveCycleCard from "../Cycles/ActiveCycleCard/ActiveCycleCard";
import EmptyCycleState from "../Cycles/EmptyCycleState/EmptyCycleState";

const DashboardTab = () => {
  const { activeCycle, loading } = useCycles();

  return (
    <div style={{ padding: '24px 0', fontFamily: 'var(--font-primary)', color: 'var(--color-text-primary)' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, marginBottom: '6px' }}>لوحة التحكم</h1>
      <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>مرحباً بك في نظام داواجن لإدارة مزارع الدواجن</p>

      {loading ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          جاري تحميل بيانات الدورة...
        </div>
      ) : activeCycle ? (
        <ActiveCycleCard cycle={activeCycle} />
      ) : (
        <EmptyCycleState />
      )}
    </div>
  );
};

export default DashboardTab;
