import { useState } from "react";
import styles from "./AddEventsModalHeader.module.css";
import AddDrugsEvents from "../AddDrugsEvents/AddDrugsEvents";
import AddFeedEvents from "../AddFeedEvents/AddFeedEvents";
import AddExpensesEvents from "../AddExpensesEvents/AddExpensesEvents";
import AddMetaDataEvents from "../AddMetaDataEvents/AddMetaDataEvents";
const AddEventsModalHeader = ({ setIsModalOpen }) => {
  const [activeTab, setActiveTab] = useState("expenses");
  const closeModal = () => setIsModalOpen(false);

  const handleTabClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveTab(e.target.id);
  };

  return (
    <div className="addEventsDialog">
      <header className={styles.header}>
        <button
          onClick={handleTabClick}
          id="drugs"
          className={styles.mainEventBtn}
        >
          Drugs
        </button>

        <button
          onClick={handleTabClick}
          id="metaData"
          className={styles.mainEventBtn}
        >
          metaData
        </button>
        <button onClick={handleTabClick} id="feed">
          Feed
        </button>
        <button onClick={handleTabClick} id="expenses">
          Expenses
        </button>
        <button onClick={closeModal} id="close">
          close
        </button>
      </header>

      <div className={styles.addEventsContent}>
        {activeTab === "drugs" && <AddDrugsEvents />}
        {activeTab === "feed" && <AddFeedEvents />}
        {activeTab === "expenses" && <AddExpensesEvents />}
        {activeTab === "metaData" && <AddMetaDataEvents />}
      </div>
    </div>
  );
};

export default AddEventsModalHeader;
