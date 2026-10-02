import React from "react";
import { X, Printer } from "lucide-react";
import { generateTraderStatementPdf } from "../../../../../../../../../../utils/pdfGenerator";
import styles from "./TraderHeader.module.css";

const TraderHeader = ({ traderData, onClose }) => {
  const { info = {}, roleLabel = "تاجر" } = traderData;

  return (
    <div className={styles.header}>
      <div>
        <h3 className={styles.nameTitle}>{info.name || "بيانات كشف الحساب"}</h3>
        <span className={styles.roleTag}>{roleLabel}</span>
      </div>
      <div className={styles.actionBtns}>
        <button onClick={() => generateTraderStatementPdf(traderData)} className={styles.pdfBtn}>
          <Printer size={15} />
          <span>تحميل كشف الحساب PDF</span>
        </button>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default TraderHeader;
