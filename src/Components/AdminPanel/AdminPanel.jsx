import AdminLayout from "./Layout/AdminLayout";
import { CycleProvider } from "./Cycles/Context/CycleContext";

const AdminPanel = () => {
  return (
    <CycleProvider>
      <main>
        <AdminLayout />
      </main>
    </CycleProvider>
  );
};

export default AdminPanel;