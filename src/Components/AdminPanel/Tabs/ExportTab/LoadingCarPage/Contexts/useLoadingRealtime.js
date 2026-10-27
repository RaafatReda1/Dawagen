import { useEffect, useState, useRef, useCallback } from "react";
import supabase from "../../../../../../utils/supabase";
import { attachChannelListeners } from "../Utils/realtimeChannelHelpers";

export const useLoadingRealtime = (cycleId, saleId, onRemoteUpdate) => {
  const [role, setRole] = useState("writer");
  const [activeUsersCount, setActiveUsersCount] = useState(1);
  const channelRef = useRef(null);
  const clientId = useRef(`usr_${Math.random().toString(36).slice(2, 8)}`).current;

  useEffect(() => {
    if (!cycleId) return;
    const ch = supabase.channel(`loading-sync-${cycleId}-${saleId || "draft"}`, { config: { presence: { key: clientId } } });
    attachChannelListeners(ch, clientId, setRole, setActiveUsersCount, onRemoteUpdate);
    ch.subscribe(async (s) => { if (s === "SUBSCRIBED") await ch.track({ joinedAt: Date.now() }); });
    channelRef.current = ch;
    return () => { supabase.removeChannel(ch); };
  }, [cycleId, saleId, clientId, onRemoteUpdate]);

  const broadcastChange = useCallback((payload) => {
    if (channelRef.current && role === "writer") {
      channelRef.current.send({ type: "broadcast", event: "live_sync", payload: { ...payload, senderId: clientId } });
    }
  }, [role, clientId]);

  const claimWriter = useCallback(() => {
    setRole("writer");
    if (channelRef.current) {
      channelRef.current.send({ type: "broadcast", event: "claim_writer", payload: { newWriterId: clientId } });
    }
  }, [clientId]);

  return { role, activeUsersCount, broadcastChange, claimWriter };
};

export default useLoadingRealtime;
