import { createContext, useContext } from "react";
import { useLoadingSession } from "../Hooks/useLoadingSession";

const LoadingSessionContext = createContext(null);

export const LoadingSessionProvider = ({
  cycleId,
  initialSaleId,
  initialSaleData,
  initialImporter,
  importers = [],
  activeLoadings = [],
  onSaleIdChange,
  onClose,
  children,
}) => {
  const session = useLoadingSession({
    cycleId,
    initialSaleId,
    initialSaleData,
    initialImporter,
    onSaleIdChange,
  });

  const value = {
    ...session,
    importers,
    activeLoadings,
    onClose,
  };

  return (
    <LoadingSessionContext.Provider value={value}>
      {children}
    </LoadingSessionContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingSessionContext);

export default LoadingSessionContext;
