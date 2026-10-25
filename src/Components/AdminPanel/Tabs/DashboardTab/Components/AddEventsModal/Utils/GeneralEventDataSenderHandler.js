import { supabase } from "../../../../../../../utils/supabase";

// every event should have a parent_day_id and also performed_by anyway before uploading any event
// and these data should be added automatically not by the user

export const sendMainEventData = async (eventData) => {
    const { error } = await supabase.from("Events").insert([eventData]);
    if (error) throw error;
}

