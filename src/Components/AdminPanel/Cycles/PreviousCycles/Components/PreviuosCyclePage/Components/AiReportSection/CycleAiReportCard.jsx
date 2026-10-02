import React, { useState } from "react";
import { Sparkles, Copy, Check } from "lucide-react";
import styles from "./CycleAiReportCard.module.css";

const CycleAiReportCard = ({ metrics }) => {
  const [copied, setCopied] = useState(false);

  const fcr = metrics?.feedFinancials?.finalFCR || 1.6;
  const netProfit = metrics?.cards?.netProfitLoss || 0;
  const isProfit = netProfit >= 0;
  const mortality = metrics?.chickFinancials?.mortalityPercentage || 0;

  const reportText = `تقرير تقييم الأداء المالي والإنتاجي للدورة:
• معامل التحويل الغذائي (FCR): ${fcr} ${fcr <= 1.6 ? "(ممتاز)" : "(تحتاج تحسين الاستهلاك)"}.
• نتيجة الدورة المالية: ${isProfit ? "كسبان" : "خسران"} بمبلغ ${netProfit.toLocaleString()} ج.م.
• نسبة النافق الكلية: ${mortality}% (تكلفة الخسارة المالية للنافق: ${metrics?.chickFinancials?.totalMortalityFinancialLoss?.toLocaleString() || 0} ج.م).
• التوصية الفنية: ${fcr > 1.7 ? "مراجعة جودة علف الدورة ونوع الكتكوت لتقليل الفقد." : "استمرار متابعة التغذية والتحصينات البيطرية في الدورات القادمة."}`;

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
