export const attachChannelListeners = (ch, clientId, setRole, setActiveUsersCount, onRemoteUpdate) => {
  ch.on("presence", { event: "sync" }, () => {
    const users = Object.keys(ch.presenceState());
    setActiveUsersCount(users.length);
    if (users[0] && users[0] !== clientId) {
      setRole((prev) => (prev === "writer" && users.indexOf(clientId) > 0 ? "previewer" : prev));
    }
  });

  ch.on("broadcast", { event: "live_sync" }, ({ payload }) => {
    if (payload?.senderId !== clientId && onRemoteUpdate) onRemoteUpdate(payload);
  });

  ch.on("broadcast", { event: "claim_writer" }, ({ payload }) => {
    setRole(payload?.newWriterId === clientId ? "writer" : "previewer");
  });
};
