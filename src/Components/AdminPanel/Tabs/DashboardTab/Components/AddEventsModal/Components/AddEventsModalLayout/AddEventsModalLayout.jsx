import { useEvents } from "../../Contexts/EventsContext";
import AddEventsModalHeader from "../AddEventsModalHeader/AddEventsModalHeader";
import NotificationBanner from "../NotificationBanner/NotificationBanner";
import GeneralEventBar from "../GeneralEventBar/GeneralEventBar";
import AddEventsModalContent from "../AddEventsModalContent/AddEventsModalContent";
import DraftConfirmModal from "../../../../../../Common/DraftConfirmModal/DraftConfirmModal";
import styles from "./AddEventsModalLayout.module.css";

const AddEventsModalLayout = () => {
  const { requestClose, showConfirm, saveDraft, discardAndClose, cancelClose } = useEvents();

  return (
    <>
      <div className={styles.overlay} onClick={requestClose} />
      <aside className={styles.modalContainer}>
        <AddEventsModalHeader />
        <NotificationBanner />
        <GeneralEventBar />
        <AddEventsModalContent />
      </aside>
      <DraftConfirmModal
        isOpen={showConfirm}
        onSaveDraft={saveDraft}
        onDiscard={discardAndClose}
        onCancel={cancelClose}
      />
    </>
  );
};

export default AddEventsModalLayout;
