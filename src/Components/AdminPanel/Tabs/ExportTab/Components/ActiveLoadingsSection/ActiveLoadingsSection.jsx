import ActiveLoadingsHeader from "./Components/ActiveLoadingsHeader/ActiveLoadingsHeader";
import ActiveLoadingCard from "./Components/ActiveLoadingCard/ActiveLoadingCard";
import styles from "./ActiveLoadingsSection.module.css";

const ActiveLoadingsSection = ({ activeLoadings = [], onResume, onDelete }) => {
  if (activeLoadings.length === 0) return null;

  return (
    <section className={styles.section}>
      <ActiveLoadingsHeader count={activeLoadings.length} />
      <div className={styles.grid}>
        {activeLoadings.map((sale) => (
          <ActiveLoadingCard
            key={sale.id}
            sale={sale}
            onResume={onResume}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default ActiveLoadingsSection;
