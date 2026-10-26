import { useEffect, useState } from "react";
import supabase from "../../../../../../utils/supabase";
import { EventsProvider } from "./Contexts/EventsContext";
import AddEventsModalHeader from "./Components/AddEventsModalHeader/AddEventsModalHeader";
import NotificationBanner from "./Components/NotificationBanner/NotificationBanner";
import GeneralEventBar from "./Components/GeneralEventBar/GeneralEventBar";
import AddEventsModalContent from "./Components/AddEventsModalContent/AddEventsModalContent";
import styles from "./AddEventsModal.module.css";

const AddEventsModal = ({ isOpen = true, onClose, setIsModalOpen, day, cycleId, rawData, refetch }) => {
  const [user, setUser] = useState(null);

  const handleClose = () => {
    if (onClose) onClose();
    if (setIsModalOpen) setIsModalOpen(false);
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUser(data.user);
    });
  }, []);

  if (!isOpen) return null;

  return (
    <EventsProvider
      day={day}
      cycleId={cycleId || day?.cycle_id}
      user={user}
      rawData={rawData}
      refetch={refetch}
      onClose={handleClose}
    >
      <div className={styles.overlay} onClick={handleClose} />
      <aside className={styles.modalContainer}>
        <AddEventsModalHeader />
        <NotificationBanner />
        <GeneralEventBar />
        <AddEventsModalContent />
      </aside>
    </EventsProvider>
  );
};

export default AddEventsModal;
