import { useEvents } from "../../Contexts/EventsContext";
import AddExpensesEvents from "../AddExpensesEvents/AddExpensesEvents";
import AddFeedEvents from "../AddFeedEvents/AddFeedEvents";
import AddDrugsEvents from "../AddDrugsEvents/AddDrugsEvents";
import AddMetaDataEvents from "../AddMetaDataEvents/AddMetaDataEvents";
import styles from "./AddEventsModalContent.module.css";

const AddEventsModalContent = () => {
  const { activeTab } = useEvents();

  return (
    <div className={styles.content}>
      {activeTab === "expenses" && <AddExpensesEvents />}
      {activeTab === "feed" && <AddFeedEvents />}
      {activeTab === "drugs" && <AddDrugsEvents />}
      {activeTab === "metaData" && <AddMetaDataEvents />}
    </div>
  );
};

export default AddEventsModalContent;
