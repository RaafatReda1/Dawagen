import EmptyFeedWarning from "./Components/EmptyFeedWarning/EmptyFeedWarning";
import FeedWeightBadge from "./Components/FeedWeightBadge/FeedWeightBadge";
import FeedConsumptionSelector from "./Components/FeedConsumptionSelector/FeedConsumptionSelector";
import styles from "./FeedForm.module.css";

const FeedForm = ({ form, onChange, onSubmit, isSubmitting, shipments = [] }) => {
  const hasShipments = shipments && shipments.length > 0;
  const lastShipment = hasShipments ? shipments[shipments.length - 1] : null;
  const activeId = form.food_id || (lastShipment ? String(lastShipment.id) : "");
  const selectedShipment = shipments.find((s) => String(s.id) === String(activeId));

  if (!hasShipments) return <EmptyFeedWarning />;

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.group}>
        <label>شحنة العلف (محدد الشحنة الأخيرة تلقائياً)</label>
        <select name="food_id" value={activeId} onChange={onChange} required>
          {shipments.map((s) => (
            <option key={s.id} value={s.id}>
              {s.feed_name} (المتبقي: {s.sacks_count} | وزن: {s.sack_weight} كجم)
              {lastShipment && s.id === lastShipment.id ? " [الشحنة الحالية]" : ""}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.group}>
        <label>عدد الشكائر المسحوبة</label>
        <input type="number" step="0.25" name="sacks_consumed" value={form.sacks_consumed} onChange={onChange} placeholder="مثال: 3" required />
      </div>

      <FeedWeightBadge sacks={form.sacks_consumed} sackWeight={selectedShipment?.sack_weight} />
      <FeedConsumptionSelector value={form.consumption_type} onChange={onChange} />

      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? "جاري الإرسال..." : "إضافة استهلاك العلف"}
      </button>
    </form>
  );
};

export default FeedForm;
