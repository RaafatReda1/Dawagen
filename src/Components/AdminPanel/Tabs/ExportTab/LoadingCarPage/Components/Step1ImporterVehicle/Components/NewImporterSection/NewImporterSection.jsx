import styles from "./NewImporterSection.module.css";

const NewImporterSection = ({ form, onChange, onBlur }) => (
  <div className={styles.grid}>
    <div className={styles.field}>
      <label>اسم التاجر / المشتري *</label>
      <input type="text" name="new_name" value={form.new_name || ""} onChange={onChange} onBlur={onBlur} placeholder="مثال: الحاج إبراهيم الشرقاوي" />
    </div>
    <div className={styles.field}>
      <label>رقم الهاتف</label>
      <input type="tel" name="new_phone" value={form.new_phone || ""} onChange={onChange} onBlur={onBlur} placeholder="010xxxxxxxx" dir="ltr" />
    </div>
    <div className={styles.field}>
      <label>العنوان / المركز</label>
      <input type="text" name="new_place" value={form.new_place || ""} onChange={onChange} onBlur={onBlur} placeholder="مثال: بنها - القليوبية" />
    </div>
  </div>
);

export default NewImporterSection;
