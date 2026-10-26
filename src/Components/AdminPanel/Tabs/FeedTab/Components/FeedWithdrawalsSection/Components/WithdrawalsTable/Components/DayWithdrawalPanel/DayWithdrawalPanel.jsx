import DayPanelHeader from "./Components/DayPanelHeader/DayPanelHeader";
import DayShipmentsSubTable from "./Components/DayShipmentsSubTable/DayShipmentsSubTable";
import styles from "./DayWithdrawalPanel.module.css";

const DayWithdrawalPanel = ({ group, isExpanded, onToggle }) => {
  return (
    <div className={`${styles.panel} ${isExpanded ? styles.expanded : ""}`}>
      <DayPanelHeader
        group={group}
        isExpanded={isExpanded}
        onToggle={onToggle}
      />
      {isExpanded && (
        <div className={styles.body}>
          <DayShipmentsSubTable items={group.items} />
        </div>
      )}
    </div>
  );
};

export default DayWithdrawalPanel;
