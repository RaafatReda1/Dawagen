import { X } from "lucide-react";
import { useEvents } from "../../Contexts/EventsContext";
import styles from "./AddEventsModalHeader.module.css";

const tabs = [
  { id: "expenses", label: "مصاريف" },
  { id: "feed", label: "أعلاف" },
  { id: "drugs", label: "أدوية" },
  { id: "metaData", label: "أوزان وملاحظات" },
];

const AddEventsModalHeader = () => {
  const { day, activeTab, setActiveTab, requestClose } = useEvents();

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <h2 className={styles.title}>تسجيل أحداث - يوم {day?.day_number}</h2>
        <button type="button" onClick={requestClose} className={styles.closeBtn} title="إغلاق">
          <X size={18} />
        </button>
      </div>

      <nav className={styles.tabsNav}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tabBtn} ${
              activeTab === tab.id ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default AddEventsModalHeader;
