import DrugWithdrawalItemRow from "./Components/DrugWithdrawalItemRow/DrugWithdrawalItemRow";
import styles from "./DayDrugSubTable.module.css";

const DayDrugSubTable = ({ items = [], diseases = [] }) => {
  return (
    <div className={styles.wrapper}>
      <table className={styles.subTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>اسم الدواء / التحصين</th>
            <th>العبوات المستهلكة</th>
            <th>الكمية المقررة</th>
            <th>الغرض العلاجي / المرض</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <DrugWithdrawalItemRow
              key={item.id || idx}
              item={item}
              index={idx}
              diseases={diseases}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DayDrugSubTable;
