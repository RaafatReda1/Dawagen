import { useExport } from "../../Contexts/ExportContext";
import ExportContent from "../ExportContent/ExportContent";
import LoadingCarPage from "../../LoadingCarPage/LoadingCarPage";

const ExportMainSwitcher = () => {
  const {
    activeLoadingId,
    activeImporter,
    sales,
    importers,
    activeLoadings,
    cycleId,
    closeLoadingPage,
    openLoadingPage,
    refetch,
  } = useExport();

  if (activeLoadingId) {
    const saleData = activeLoadingId !== "new"
      ? sales.find((s) => String(s.id) === String(activeLoadingId))
      : null;

    return (
      <LoadingCarPage
        key={activeLoadingId === "new" ? "new_session" : `sale_${activeLoadingId}`}
        cycleId={cycleId}
        saleId={activeLoadingId}
        saleData={saleData}
        importer={activeImporter || saleData?.Importers}
        importers={importers}
        activeLoadings={activeLoadings}
        onSelectSession={(id) => openLoadingPage(id)}
        onNewSession={() => openLoadingPage("new")}
        onClose={closeLoadingPage}
        refetch={refetch}
      />
    );
  }

  return <ExportContent />;
};

export default ExportMainSwitcher;
