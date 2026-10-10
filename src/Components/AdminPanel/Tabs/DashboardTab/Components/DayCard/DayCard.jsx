import React from 'react'
import styles from "./DayCard.module.css"
const DayCard = ({day}) => {
    const { id, day_number} = day
  return (
    <div className={styles.dayCard}>
        <span>يوم {day_number}</span>
        <button>Add Events</button>
    </div>
  )
}

export default DayCard