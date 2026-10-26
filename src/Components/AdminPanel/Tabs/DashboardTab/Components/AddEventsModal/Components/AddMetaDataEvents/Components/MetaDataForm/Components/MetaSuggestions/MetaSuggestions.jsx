import { Plus } from "lucide-react";
import styles from "./MetaSuggestions.module.css";

const suggestions = ["تهوية", "رطوبة", "إضاءة", "فرشة", "حرارة العنبر"];

const MetaSuggestions = ({ onSelect }) => (
  <div className={styles.chipsRow}>
    {suggestions.map((item) => (
      <button
        key={item}
        type="button"
        className={styles.chip}
        onClick={() => onSelect(item)}
      >
        <Plus size={11} />
        <span>{item}</span>
      </button>
    ))}
  </div>
);

export default MetaSuggestions;
