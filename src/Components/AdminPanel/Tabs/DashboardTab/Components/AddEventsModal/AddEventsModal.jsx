import { createContext, useEffect, useState } from "react";
import styles from "./AddEventsModal.module.css";
import AddEventsModalHeader from "./Components/AddEventsModalHeader/AddEventsModalHeader";
import supabase from "../../../../../../utils/supabase";

export const generalEventDataContext = createContext();
const AddEventsModal = ({ setIsModalOpen, day }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const handleGetUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data) setUser(data.user);
      if (error) console.log(error);
    };
    handleGetUser();
  }, []);
  
  return (
    <generalEventDataContext.Provider value={{user, day}}>
      <div className={styles.modalContainer}>
        <AddEventsModalHeader setIsModalOpen={setIsModalOpen} />
      </div>
    </generalEventDataContext.Provider>
  );
};

export default AddEventsModal;
