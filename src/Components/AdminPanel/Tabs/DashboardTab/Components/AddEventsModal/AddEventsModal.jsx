import { useEffect, useState } from "react";
import supabase from "../../../../../../utils/supabase";
import { EventsProvider } from "./Contexts/EventsContext";
import AddEventsModalLayout from "./Components/AddEventsModalLayout/AddEventsModalLayout";

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
      day={day} cycleId={cycleId || day?.cycle_id} user={user}
      rawData={rawData} refetch={refetch} onClose={handleClose}
    >
      <AddEventsModalLayout />
    </EventsProvider>
  );
};

export default AddEventsModal;
