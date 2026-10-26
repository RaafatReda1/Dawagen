import { useEvents } from "../../Contexts/EventsContext";
import { useFeedSubmit } from "./Hooks/useFeedSubmit";
import FeedForm from "./Components/FeedForm/FeedForm";
import styles from "./AddFeedEvents.module.css";

const AddFeedEvents = () => {
  const { rawData } = useEvents();
  const { form, isSubmitting, handleChange, handleSubmit } =
    useFeedSubmit();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>تسجيل استهلاك العلف</h3>
      <FeedForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        shipments={rawData?.feedShipments}
      />
    </div>
  );
};

export default AddFeedEvents;