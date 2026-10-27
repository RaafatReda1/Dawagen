import { useEffect, useState } from "react";
import supabase from "../../../../../utils/supabase";

export const useExportRealtime = (cycleId, refetch) => {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!cycleId) return;

    const channel = supabase
      .channel(`farm-sales-cycle-${cycleId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "FarmSales",
          filter: `cycle_id=eq.${cycleId}`,
        },
        () => {
          if (refetch) refetch();
        }
      )
      .subscribe((status) => {
        setIsLive(status === "SUBSCRIBED");
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [cycleId, refetch]);

  return { isLive };
};

export default useExportRealtime;
