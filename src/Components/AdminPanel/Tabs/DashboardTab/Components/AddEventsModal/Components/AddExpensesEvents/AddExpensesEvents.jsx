import { useExpenseSubmit } from "./Hooks/useExpenseSubmit";
import ExpensesForm from "./Components/ExpensesForm/ExpensesForm";
import styles from "./AddExpensesEvents.module.css";

const AddExpensesEvents = () => {
  const { form, isSubmitting, handleChange, handleSubmit } =
    useExpenseSubmit();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>تسجيل مصروفات اليوم</h3>
      <ExpensesForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AddExpensesEvents;