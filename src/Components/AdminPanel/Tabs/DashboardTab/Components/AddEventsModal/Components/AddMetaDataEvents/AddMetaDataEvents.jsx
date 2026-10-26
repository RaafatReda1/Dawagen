import { useMetaSubmit } from "./Hooks/useMetaSubmit";
import MetaDataForm from "./Components/MetaDataForm/MetaDataForm";
import styles from "./AddMetaDataEvents.module.css";

const AddMetaDataEvents = () => {
  const {
    weights,
    meta,
    isSubmitting,
    handleWeightChange,
    handleMetaChange,
    handleSubmit,
  } = useMetaSubmit();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>تسجيل أوزان الطيور والظروف البيئية</h3>
      <MetaDataForm
        weights={weights}
        meta={meta}
        onWeightChange={handleWeightChange}
        onMetaChange={handleMetaChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AddMetaDataEvents;