import styles from "./GeneralEventInputs.module.css";

const GeneralEventInputs = ({ generalInfo, onChange, diseases }) => (
  <div className={styles.inputsRow}>
    <div className={styles.group}>
      <label>الحرارة (°C)</label>
      <input
        type="number"
        step="0.1"
        name="temperature"
        value={generalInfo.temperature}
        onChange={onChange}
        placeholder="33.5"
      />
    </div>
    <div className={styles.group}>
      <label>النافق</label>
      <input
        type="number"
        name="deaths"
        value={generalInfo.deaths}
        onChange={onChange}
        placeholder="0"
      />
    </div>
    <div className={styles.group}>
      <label>سبب النفوق</label>
      <select
        name="deathReason"
        value={generalInfo.deathReason}
        onChange={onChange}
      >
        <option value="">(اختياري)</option>
        {diseases?.map((d) => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>
    </div>
  </div>
);

export default GeneralEventInputs;
