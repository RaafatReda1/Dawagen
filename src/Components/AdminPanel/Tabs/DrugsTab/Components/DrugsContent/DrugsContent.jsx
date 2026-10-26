import DrugsNotification from "../DrugsNotification/DrugsNotification";
import DrugsHeader from "../DrugsHeader/DrugsHeader";
import DrugsOverview from "../DrugsOverview/DrugsOverview";
import MedicineInvoicesSection from "../MedicineInvoicesSection/MedicineInvoicesSection";
import DrugWithdrawalsSection from "../DrugWithdrawalsSection/DrugWithdrawalsSection";
import AddInvoiceModal from "../AddInvoiceModal/AddInvoiceModal";
import styles from "./DrugsContent.module.css";

const DrugsContent = () => (
  <div className={styles.container}>
    <DrugsNotification />
    <DrugsHeader />
    <DrugsOverview />
    <MedicineInvoicesSection />
    <DrugWithdrawalsSection />
    <AddInvoiceModal />
  </div>
);

export default DrugsContent;
