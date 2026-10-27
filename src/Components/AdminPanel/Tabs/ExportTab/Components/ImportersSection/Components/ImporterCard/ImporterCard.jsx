import { User, Phone, MapPin, Truck, PlusCircle } from "lucide-react";
import styles from "./ImporterCard.module.css";

const ImporterCard = ({ importer, onSelect }) => {
  const phones = Array.isArray(importer.phone_number) ? importer.phone_number : [];
  const vehicles = Array.isArray(importer.vehicle_types) ? importer.vehicle_types : [];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}><User size={20} /></div>
        <div className={styles.info}>
          <h4 className={styles.name}>{importer.name}</h4>
          {importer.place && <span className={styles.place}><MapPin size={12} />{importer.place}</span>}
        </div>
      </div>
      <div className={styles.details}>
        {phones.length > 0 && <div className={styles.row}><Phone size={13} className={styles.icon} /><span className={styles.phoneText}>{phones.join(" ، ")}</span></div>}
        <div className={styles.vehiclesList}>
          <Truck size={13} className={styles.icon} />
          <div className={styles.tags}>
            {vehicles.length > 0 ? vehicles.map((v, i) => <span key={i} className={styles.tag}>{v}</span>) : <span className={styles.emptyTag}>لا توجد سيارات</span>}
          </div>
        </div>
      </div>
      <button type="button" className={styles.actionBtn} onClick={() => onSelect(importer)}>
        <PlusCircle size={15} /><span>بدء تحميل لـ {importer.name.split(" ")[0]}</span>
      </button>
    </div>
  );
};

export default ImporterCard;
