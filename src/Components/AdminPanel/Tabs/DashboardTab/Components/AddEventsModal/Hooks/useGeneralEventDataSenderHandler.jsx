import { useContext } from "react";
import { generalEventDataContext } from "../AddEventsModal";
import supabase from "../../../../../../../utils/supabase";

const useGeneralEventDataSenderHandler = () => {
  const { user, day } = useContext(generalEventDataContext);
  const sendMainEventData = async () => {
    const { error } = await supabase
      .from("Events")
      .insert({ performed_by: user.id, parent_day_id: day.id });
    if (error) throw error;
  };
  return { sendMainEventData };
};

export default useGeneralEventDataSenderHandler;
