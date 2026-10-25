import React, { useState } from 'react'
import styles from "./DayCard.module.css"
import AddEventsModal from '../AddEventsModal/AddEventsModal';
const DayCard = ({day}) => {
    const { day_number} = day;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
  return (
    <div className={styles.dayCard}>
        <span>يوم {day_number}</span>
        <button onClick={openModal}>Add Events</button>
        {isModalOpen && <AddEventsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} day={day}/>}
    </div>
  )
}

export default DayCard