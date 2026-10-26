import styles from "./DrugWithdrawalItemRow.module.css";

const DrugWithdrawalItemRow = ({ item, index, diseases = [] }) => {
  const disease = diseases.find((d) => Number(d.id) === Number(item.disease_id));

  return (
    <tr className={styles.row}>
      <td className={styles.numCol}>#{index + 1}</td>
      <td className={styles.nameCol}>
        <strong>{item.drugName}</strong>
      </td>
      <td>{item.packagesCount > 0 ? `${item.packagesCount} عبوة` : "-"}</td>
      <td className={styles.capCol}>
        {item.consumedCapacity > 0 ? `${item.consumedCapacity} ${item.measurementType}` : "-"}
      </td>
      <td>
        {disease ? (
          <span className={styles.diseaseBadge}>{disease.name}</span>
        ) : (
          <span className={styles.generalBadge}>وقائي / عام</span>
        )}
      </td>
    </tr>
  );
};

export default DrugWithdrawalItemRow;
