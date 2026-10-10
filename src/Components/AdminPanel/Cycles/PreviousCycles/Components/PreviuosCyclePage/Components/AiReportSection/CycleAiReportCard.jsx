import React, { useState } from "react";
import { Sparkles, Copy, Check } from "lucide-react";
import styles from "./CycleAiReportCard.module.css";

const CycleAiReportCard = () => {
  const [copied, setCopied] = useState(false);

  const reportText = `تقرير تقييم الأداء المالي والإنتاجي للدورة:
• معامل التحويل الغذائي (FCR): DATA HERE!
• نتيجة الدورة المالية: DATA HERE!
• نسبة النافق الكلية: DATA HERE!
• التوصية الفنية: DATA HERE!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <div className={styles.title}><Sparkles size={20} /><span>تقرير التقييم والتغذية الراجعة للدورة</span></div>
        <button onClick={handleCopy} className={styles.copyBtn}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? "تم النسخ!" : "نسخ تقرير التقييم"}</span>
        </button>
      </div>
      <p className={styles.reportText}>{reportText}</p>
    </div>
  );
};

export default CycleAiReportCard;
