import styles from "./NewImporterFields.module.css";

const NewImporterFields = ({ form, onChange }) => (
  <div className={styles.grid}>
    <div className={styles.group}>
      <label>اسم التاجر / المشتري *</label>
      <input type="text" name="new_name" value={form.new_name || ""} onChange={onChange} placeholder="مثال: الحاج سمير حميد" required />
    </div>

    <div className={styles.group}>
      <label>رقم الهاتف</label>
      <input type="tel" name="new_phone" value={form.new_phone || ""} onChange={onChange} placeholder="010xxxxxxxx" dir="ltr" />
    </div>

    <div className={styles.group}>
      <label>المحافظة / العنوان</label>
      <input type="text" name="new_place" value={form.new_place || ""} onChange={onChange} placeholder="مثال: المنصورة - الدقهلية" />
    </div>

    <div className={styles.group}>
      <label>نوع السيارة الشائعة</label>
      <input type="text" name="new_vehicle" value={form.new_vehicle || ""} onChange={onChange} placeholder="مثال: سيارة جامبو صندوق" />
    </div>
  </div>
);

export default NewImporterFields;
