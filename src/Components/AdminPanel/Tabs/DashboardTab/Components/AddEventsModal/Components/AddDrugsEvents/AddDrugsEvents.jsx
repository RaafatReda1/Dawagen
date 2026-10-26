import { useEvents } from "../../Contexts/EventsContext";
import { useDrugSubmit } from "./Hooks/useDrugSubmit";
import DrugForm from "./Components/DrugForm/DrugForm";
import styles from "./AddDrugsEvents.module.css";

const AddDrugsEvents = () => {
  const { rawData } = useEvents();
  const { form, isSubmitting, handleChange, handleSubmit } =
    useDrugSubmit();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>تسجيل سحب وعلاج الأدوية</h3>
      <DrugForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        medicines={rawData?.medicine}
        diseases={rawData?.diseases}
      />
    </div>
  );
};

export default AddDrugsEvents;