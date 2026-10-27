import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { useExportRealtime } from "./useExportRealtime";
import { useExportStats } from "../Hooks/useExportStats";
import { deleteFarmSaleRecord } from "../Utils/salesOps";
import { clearSessionLocal } from "../LoadingCarPage/Utils/loadingStorageHelpers";

const ExportContext = createContext(null);

export const ExportProvider = ({ cycleId, cycleData, rawData, refetch, children }) => {
  const [activeLoadingId, setActiveLoadingId] = useState(null);
  const [activeImporter, setActiveImporter] = useState(null);
  const [notification, setNotification] = useState(null);

  const { isLive } = useExportRealtime(cycleId, refetch);
  const sales = rawData?.farmSales || [];
  const importers = rawData?.importers || [];
  const stats = useExportStats(sales);

  const activeLoadings = useMemo(() =>
    sales.filter((s) => (s.tare_weights?.length > 0 && s.gross_weights?.length === 0) || !s.execution_price),
    [sales]
  );

  const notify = useCallback((message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  }, []);

  const openLoadingPage = (saleId = "new", imp = null) => {
    setActiveLoadingId(saleId);
    setActiveImporter(imp);
  };
  const closeLoadingPage = () => {
    setActiveLoadingId(null);
    setActiveImporter(null);
  };

  const deleteLoading = useCallback(async (saleId) => {
    try {
      await deleteFarmSaleRecord(saleId);
      clearSessionLocal(cycleId, saleId);
      if (activeLoadingId === saleId) {
        closeLoadingPage();
      }
      if (refetch) await refetch();
      notify("تم حذف شحنة التحميل بنجاح", "success");
      return true;
    } catch (err) {
      console.error("Error deleting loading:", err);
      notify("فشل حذف الشحنة: " + (err.message || "حدث خطأ غير متوقع"), "error");
      return false;
    }
  }, [cycleId, activeLoadingId, refetch, notify]);

  const value = {
    cycleId, cycleData, rawData, refetch, isLive, sales, importers, stats,
    notification, notify, activeLoadingId, activeImporter, activeLoadings,
    openLoadingPage, closeLoadingPage, deleteLoading,
    openAddModal: (imp) => openLoadingPage("new", imp),
    openEditModal: (sale) => openLoadingPage(sale?.id, null),
    closeModal: closeLoadingPage,
  };

  return <ExportContext.Provider value={value}>{children}</ExportContext.Provider>;
};

export const useExport = () => useContext(ExportContext);
