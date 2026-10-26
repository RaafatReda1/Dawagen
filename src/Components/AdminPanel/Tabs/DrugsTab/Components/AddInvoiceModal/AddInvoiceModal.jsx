import { useDrugs } from "../../Contexts/DrugsContext";
import { useAddInvoice } from "./Hooks/useAddInvoice";
import InvoiceModalHeader from "./Components/InvoiceModalHeader/InvoiceModalHeader";
import InvoiceForm from "./Components/InvoiceForm/InvoiceForm";
import DraftConfirmModal from "../../../../Common/DraftConfirmModal/DraftConfirmModal";
import styles from "./AddInvoiceModal.module.css";

const AddInvoiceModal = () => {
  const { isModalOpen, setIsModalOpen } = useDrugs();
  const handleClose = () => setIsModalOpen(false);

  const {
    form, isSubmitting, handleChange, handleAddItem, handleRemoveItem,
    handleUpdateItem, handleSubmit, totalPrice, suppliers, diseases, draft,
  } = useAddInvoice(handleClose);

  if (!isModalOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={draft.requestClose} />
      <div className={styles.modal}>
        <InvoiceModalHeader onClose={draft.requestClose} />
        <InvoiceForm
          form={form} onChange={handleChange} onSubmit={handleSubmit}
          isSubmitting={isSubmitting} suppliers={suppliers} diseases={diseases}
          onAddItem={handleAddItem} onUpdateItem={handleUpdateItem}
          onRemoveItem={handleRemoveItem} totalPrice={totalPrice}
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

export default AddInvoiceModal;
