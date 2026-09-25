import { useState } from "react";
import CycleFormInputs from "./CycleFormInputs";
import CycleSummary from "../CycleSummary/CycleSummary";
import ModalActions from "../ModalActions/ModalActions";
import { useCycles } from "../../../Context/CycleContext";
import styles from "./CycleForm.module.css";

const CycleForm = ({ onClose }) => {
  const { createCycle } = useCycles();
  const [data, setData] = useState({
    chick_type: "كب (Cobb)",
    number_of_chicks: "",
    chick_price: "",
    started_at: new Date().toISOString().split("T")[0],
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (key, val) => setData((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!data.chick_type.trim()) {
      return setError("يرجى تحديد أو كتابة نوع وسلالة الكتكوت.");
    }
    if (!data.number_of_chicks || Number(data.number_of_chicks) <= 0) {
      return setError("يرجى إدخال عدد كتاكيت صحيح أكبر من الصفر.");
    }
    if (!data.chick_price || Number(data.chick_price) <= 0) {
      return setError("يرجى إدخال سعر كتكوت صحيح أكبر من الصفر.");
    }

    try {
      setSubmitting(true);
      await createCycle(data);
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء حفظ بيانات الدورة. يرجى المحاولة مرة أخرى.");
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <div className={styles.errorBanner}>{error}</div>}
      <CycleFormInputs data={data} onUpdate={update} />
      <CycleSummary numberOfChicks={data.number_of_chicks} chickPrice={data.chick_price} />
      <ModalActions onCancel={onClose} submitting={submitting} />
    </form>
  );
};

export default CycleForm;
