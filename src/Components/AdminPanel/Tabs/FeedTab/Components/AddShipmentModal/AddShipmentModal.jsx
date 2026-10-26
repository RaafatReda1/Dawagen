import { useFeed } from "../../Contexts/FeedContext";
import { useAddShipment } from "./Hooks/useAddShipment";
import ShipmentModalHeader from "./Components/ShipmentModalHeader/ShipmentModalHeader";
import ShipmentForm from "./Components/ShipmentForm/ShipmentForm";
import DraftConfirmModal from "../../../../Common/DraftConfirmModal/DraftConfirmModal";
import styles from "./AddShipmentModal.module.css";

const AddShipmentModal = () => {
  const { isModalOpen, setIsModalOpen } = useFeed();
  const handleClose = () => setIsModalOpen(false);

  const { form, isSubmitting, handleChange, handleSubmit, suppliers, draft } =
    useAddShipment(handleClose);

  if (!isModalOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={draft.requestClose} />
      <div className={styles.modal}>
        <ShipmentModalHeader onClose={draft.requestClose} />
        <ShipmentForm
          form={form} onChange={handleChange} onSubmit={handleSubmit}
          isSubmitting={isSubmitting} suppliers={suppliers}
        />
      </div>
      <DraftConfirmModal
        isOpen={draft.showConfirm}
        onSaveDraft={draft.saveDraft}
        onDiscard={draft.discardAndClose}
        onCancel={draft.cancelClose}
      />
    </>
  );
};

export default AddShipmentModal;
