import FeedNotification from "../FeedNotification/FeedNotification";
import FeedHeader from "../FeedHeader/FeedHeader";
import FeedInventoryOverview from "../FeedInventoryOverview/FeedInventoryOverview";
import FeedShipmentsSection from "../FeedShipmentsSection/FeedShipmentsSection";
import FeedWithdrawalsSection from "../FeedWithdrawalsSection/FeedWithdrawalsSection";
import AddShipmentModal from "../AddShipmentModal/AddShipmentModal";
import styles from "./FeedContent.module.css";

const FeedContent = () => (
  <div className={styles.container}>
    <FeedNotification />
    <FeedHeader />
    <FeedInventoryOverview />
    <FeedShipmentsSection />
    <FeedWithdrawalsSection />
    <AddShipmentModal />
  </div>
);

export default FeedContent;
