import { calculateTareTotal, calculateGrossTotal } from "../../../../../Utils";
import styles from "./ComparisonTable.module.css";

const ComparisonTable = ({ local, server }) => {
  const localTare = calculateTareTotal(local?.tareWeights);
  const serverTare = calculateTareTotal(server?.tare_weights);
  const localGross = calculateGrossTotal(local?.grossWeights);
  const serverGross = calculateGrossTotal(server?.gross_weights);

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>بيانات الشحنة</th>
            <th>نسخة السيرفر (قاعدة البيانات)</th>
            <th>النسخة المحلية (مسودة جهازك)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>عدد وزنات الفارغ</td>
            <td>{server?.tare_weights?.length || 0} وزنات ({serverTare} كجم)</td>
            <td className={styles.highlight}>{local?.tareWeights?.length || 0} وزنات ({localTare} كجم)</td>
          </tr>
          <tr>
            <td>عدد وزنات القائم</td>
            <td>{server?.gross_weights?.length || 0} وزنات ({serverGross} كجم)</td>
            <td className={styles.highlight}>{local?.grossWeights?.length || 0} وزنات ({localGross} كجم)</td>
          </tr>
          <tr>
            <td>سعر الكيلو</td>
            <td>{server?.execution_price || 0} ج.م</td>
            <td className={styles.highlight}>{local?.form?.execution_price || 0} ج.م</td>
          </tr>
          <tr>
            <td>توقيت آخر تحديث</td>
            <td>{server?.created_at ? new Date(server.created_at).toLocaleTimeString("ar-EG") : "غير محدد"}</td>
            <td className={styles.highlight}>{local?.updatedAt ? new Date(local.updatedAt).toLocaleTimeString("ar-EG") : "غير محدد"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
