import styles from "./ShipmentRow.module.css";

const ShipmentRow = ({ shipment, index }) => {
  const sacks = Number(shipment.sacks_count) || 0;
  const price = Number(shipment.sack_price) || 0;
  const weight = Number(shipment.sack_weight) || 25;
  const total = sacks * price;
  const paid = (shipment.payments || []).reduce((acc, p) => acc + (Number(p.amount) || 0), 0);
  const remaining = Math.max(0, total - paid);

  const getStatusBadge = () => {
    if (paid >= total && total > 0) return <span className={styles.paidBadge}>خالص</span>;
    if (paid > 0) return <span className={styles.partialBadge}>مدفوع جزئياً</span>;
    return <span className={styles.dueBadge}>آجل</span>;
  };

  return (
    <tr className={styles.row}>
      <td className={styles.numCol}>#{index + 1}</td>
      <td className={styles.feedCol}>
        <strong>{shipment.feed_name || "علف"}</strong>
        <span className={styles.sub}>{weight} كجم / شيكارة</span>
      </td>
      <td>{shipment.FeedSuppliers?.name || "غير محدد"}</td>
      <td>{sacks.toLocaleString()}</td>
      <td>{price.toLocaleString()} ج.م</td>
      <td>{total.toLocaleString()} ج.م</td>
      <td>{paid.toLocaleString()} ج.م</td>
      <td className={remaining > 0 ? styles.remText : ""}>{remaining.toLocaleString()} ج.م</td>
      <td>{getStatusBadge()}</td>
    </tr>
  );
};

export default ShipmentRow;
