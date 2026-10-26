import ShipmentWithdrawalRow from "./Components/ShipmentWithdrawalRow/ShipmentWithdrawalRow";
import styles from "./DayShipmentsSubTable.module.css";

const DayShipmentsSubTable = ({ items = [] }) => {
  return (
    <div className={styles.wrapper}>
      <table className={styles.subTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>نوع العلف / الشحنة</th>
            <th>الشكائر المسحوبة</th>
            <th>وزن الشيكارة</th>
            <th>الوزن الإجمالي</th>
            <th>حالة الاستهلاك</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <ShipmentWithdrawalRow
              key={item.id || idx}
              item={item}
              index={idx}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DayShipmentsSubTable;
