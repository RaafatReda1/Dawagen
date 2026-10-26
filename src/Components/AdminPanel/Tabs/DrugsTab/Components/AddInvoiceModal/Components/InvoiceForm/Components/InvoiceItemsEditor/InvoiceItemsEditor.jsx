import { Plus } from "lucide-react";
import MedicineItemRow from "./Components/MedicineItemRow/MedicineItemRow";
import styles from "./InvoiceItemsEditor.module.css";

const InvoiceItemsEditor = ({ items = [], onAddItem, onUpdateItem, onRemoveItem }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <span className={styles.title}>أصناف الأدوية والمستلزمات داخل الفاتورة:</span>
        <button type="button" onClick={onAddItem} className={styles.addBtn}>
          <Plus size={14} />
          <span>إضافة صنف دواء آخر</span>
        </button>
      </div>

      <div className={styles.itemsList}>
        {items.map((item, idx) => (
          <MedicineItemRow
            key={idx}
            item={item}
            index={idx}
            onChange={onUpdateItem}
            onRemove={onRemoveItem}
            canRemove={items.length > 1}
          />
        ))}
      </div>
    </div>
  );
};

export default InvoiceItemsEditor;
