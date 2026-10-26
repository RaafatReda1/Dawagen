import ShipmentRow from "./Components/ShipmentRow/ShipmentRow";
import styles from "./ShipmentsTable.module.css";

const ShipmentsTable = ({ shipments = [] }) => {
  if (shipments.length === 0) {
    return <div className={styles.empty}>لا توجد شحنات علف مسجلة في هذه الدورة حتى الآن.</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>نوع العلف</th>
            <th>المورد</th>
            <th>الشكائر</th>
            <th>سعر الشيكارة</th>
            <th>الإجمالي</th>
            <th>المدفوع</th>
            <th>المتبقي</th>
            <th>حالة السداد</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((s, i) => (
            <ShipmentRow key={s.id || i} shipment={s} index={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentsTable;
