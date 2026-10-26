import DayDrugHeader from "./Components/DayDrugHeader/DayDrugHeader";
import DayDrugSubTable from "./Components/DayDrugSubTable/DayDrugSubTable";
import styles from "./DayDrugPanel.module.css";

const DayDrugPanel = ({ group, isExpanded, onToggle, diseases = [] }) => {
  return (
    <div className={`${styles.panel} ${isExpanded ? styles.expanded : ""}`}>
      <DayDrugHeader
        group={group}
        isExpanded={isExpanded}
        onToggle={onToggle}
      />
      {isExpanded && (
        <div className={styles.body}>
          <DayDrugSubTable items={group.items} diseases={diseases} />
        </div>
      )}
    </div>
  );
};

export default DayDrugPanel;
