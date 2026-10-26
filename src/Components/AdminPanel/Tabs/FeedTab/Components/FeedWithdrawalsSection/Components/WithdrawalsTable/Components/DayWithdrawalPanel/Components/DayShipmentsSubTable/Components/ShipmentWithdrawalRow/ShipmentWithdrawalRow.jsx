import styles from "./ShipmentWithdrawalRow.module.css";

const ShipmentWithdrawalRow = ({ item, index }) => {
  const tons = (item.totalKg / 1000).toFixed(3);

  return (
    <tr className={styles.row}>
      <td className={styles.numCol}>#{index + 1}</td>
      <td className={styles.feedCol}>
        <strong>{item.feedName}</strong>
      </td>
      <td className={styles.sacksCol}>{item.sacks.toLocaleString()} شيكارة</td>
      <td>{item.sackWeight} كجم</td>
      <td>{item.totalKg.toLocaleString()} كجم ({tons} طن)</td>
      <td>
        <span className={item.isDamaged ? styles.damagedBadge : styles.consumedBadge}>
          {item.isDamaged ? "هالك / تالف" : "مستهلك للطيور"}
        </span>
      </td>
    </tr>
  );
};

export default ShipmentWithdrawalRow;
