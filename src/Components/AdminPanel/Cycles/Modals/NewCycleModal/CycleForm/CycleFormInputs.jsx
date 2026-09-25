import ChickTypeSelect from "./Inputs/ChickTypeSelect";
import NumberInput from "./Inputs/NumberInput";
import DateInput from "./Inputs/DateInput";
import styles from "./CycleForm.module.css";

const CycleFormInputs = ({ data, onUpdate }) => (
  <>
    <ChickTypeSelect value={data.chick_type} onChange={(v) => onUpdate("chick_type", v)} />
    <div className={styles.twoColRow}>
      <NumberInput label="عدد الكتاكيت (القطيع)" placeholder="مثال: 5000" unit="كتكوت" min="1" value={data.number_of_chicks} onChange={(v) => onUpdate("number_of_chicks", v)} />
      <NumberInput label="سعر الكتكوت الواحد" placeholder="مثال: 28.5" unit="ج.م" min="0.1" step="0.1" value={data.chick_price} onChange={(v) => onUpdate("chick_price", v)} />
    </div>
    <DateInput label="تاريخ بدء وتسكين الدورة" value={data.started_at} onChange={(v) => onUpdate("started_at", v)} />
  </>
);

export default CycleFormInputs;
