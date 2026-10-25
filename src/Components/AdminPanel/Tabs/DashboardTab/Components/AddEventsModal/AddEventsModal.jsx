import React from "react";
import styles from "./AddEventsModal.module.css";
import AddEventsModalHeader from "./Components/AddEventsModalHeader/AddEventsModalHeader";
const AddEventsModal = ({ setIsModalOpen }) => {
  return (
    <div className={styles.modalContainer}>
      <AddEventsModalHeader setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default AddEventsModal;
