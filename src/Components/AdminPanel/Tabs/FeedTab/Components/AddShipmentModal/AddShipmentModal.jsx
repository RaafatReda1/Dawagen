import { useFeed } from "../../Contexts/FeedContext";
import { useAddShipment } from "./Hooks/useAddShipment";
import ShipmentModalHeader from "./Components/ShipmentModalHeader/ShipmentModalHeader";
import ShipmentForm from "./Components/ShipmentForm/ShipmentForm";
import styles from "./AddShipmentModal.module.css";

const AddShipmentModal = () => {
  const { isModalOpen, setIsModalOpen } = useFeed();
  const handleClose = () => setIsModalOpen(false);

  const { form, isSubmitting, handleChange, handleSubmit, suppliers } =
    useAddShipment(handleClose);

  if (!isModalOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={handleClose} />
      <div className={styles.modal}>
        <ShipmentModalHeader onClose={handleClose} />
        <ShipmentForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          suppliers={suppliers}
        />
      </div>
    </>
  );
};

export default AddShipmentModal;
