import { formatEgp } from "./formatters";

const getPdfStyles = () => `
  @media print {
    @page { size: A4 portrait; margin: 12mm 15mm; }
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
  body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; direction: rtl; color: #0f172a; background: #fff; margin: 0; padding: 24px; font-size: 13px; line-height: 1.5; }
  .brand-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #059669; padding-bottom: 16px; margin-bottom: 20px; }
  .brand-title { font-size: 22px; font-weight: 800; color: #047857; margin: 0; }
  .brand-sub { font-size: 12px; color: #64748b; margin-top: 4px; }
  .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; }
  .badge-paid { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
  .badge-unpaid { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }
  .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
  .summary-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; }
  .summary-label { font-size: 11px; color: #64748b; font-weight: 600; margin-bottom: 4px; }
  .summary-val { font-size: 15px; font-weight: 800; color: #0f172a; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
  th { background: #f1f5f9; color: #334155; font-weight: 700; padding: 10px 12px; border-bottom: 2px solid #cbd5e1; text-align: right; }
  td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #1e293b; }
  tr:nth-child(even) { background: #fafafa; }
  .signatures { margin-top: 40px; display: flex; justify-content: space-between; padding-top: 20px; border-top: 1px solid #e2e8f0; }
  .sig-box { text-align: center; width: 220px; }
  .sig-title { font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 45px; }
  .sig-line { border-top: 1px stroke #94a3b8; padding-top: 4px; font-size: 11px; color: #64748b; }
  .footer { margin-top: 30px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 12px; }
`;

export const generateInvoicePdf = (invoice) => {
  if (!invoice) return;
  const supplierName = invoice.MedicineSuppliers?.name || `مورد أدوية #${invoice.supplier_id || 1}`;
  const invDate = invoice.created_at ? new Date(invoice.created_at).toLocaleDateString("ar-EG") : "غير محدد";
  const items = invoice.Medicine || [];
  const total = invoice.calculatedTotal || invoice.total_price || 0;
  const paid = invoice.calculatedPaid || 0;
  const debt = invoice.calculatedDebt || 0;

  const itemsRows = items.map((m, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><strong>${m.name || m.medicine_name || "علاج بيطري"}</strong></td>
      <td>${m.units_count || m.quantity || 1} ${m.measurement_type || m.unit_size || "عبوة"}</td>
      <td>${m.unit_capacity || "—"}</td>
      <td>${formatEgp(m.unit_price || 0)}</td>
      <td><strong>${formatEgp((m.units_count || m.quantity || 1) * (m.unit_price || 0))}</strong></td>
    </tr>
  `).join("");

  const printWindow = window.open("", "_blank", "width=850,height=950");
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>فاتورة علاج - ${supplierName}</title><style>${getPdfStyles()}</style></head>
    <body>
      <div class="brand-header">
        <div><h1 class="brand-title">منظومة مزارع الدواجن — فاتورة بيطرية رسمية</h1><div class="brand-sub">المورد / الصيدلية: <strong>${supplierName}</strong> | تاريخ الصدور: ${invDate}</div></div>
        <div><span class="badge ${debt > 0 ? 'badge-unpaid' : 'badge-paid'}">${debt > 0 ? `متبقي: ${formatEgp(debt)}` : 'مسددة بالكامل'}</span></div>
      </div>
      <div class="summary-grid">
        <div class="summary-card"><div class="summary-label">إجمالي الفاتورة</div><div class="summary-val">${formatEgp(total)}</div></div>
        <div class="summary-card"><div class="summary-label">المبلغ المسدد</div><div class="summary-val" style="color:#16a34a">${formatEgp(paid)}</div></div>
        <div class="summary-card"><div class="summary-label">المتبقي / المديونية</div><div class="summary-val" style="color:${debt > 0 ? '#dc2626' : '#16a34a'}">${formatEgp(debt)}</div></div>
        <div class="summary-card"><div class="summary-label">عدد الأصناف</div><div class="summary-val">${items.length} أصناف</div></div>
      </div>
      <table>
        <thead><tr><th>#</th><th>اسم العلاج / التحصين</th><th>الكمية</th><th>التركيز / السعة</th><th>سعر الوحدة</th><th>الإجمالي</th></tr></thead>
        <tbody>${itemsRows.length > 0 ? itemsRows : '<tr><td colspan="6" style="text-align:center">علاجات بيطرية مسجلة إجمالياً بالنظام</td></tr>'}</tbody>
      </table>
      <div class="signatures">
        <div class="sig-box"><div class="sig-title">توقيع المستلم (إدارة المزرعة)</div><div class="sig-line">الاسم والتوقيع</div></div>
        <div class="sig-box"><div class="sig-title">اعتماد الصيدلية / المورد</div><div class="sig-line">الختم والتوقيع</div></div>
      </div>
      <div class="footer">تاريخ الطباعة: ${new Date().toLocaleDateString("ar-EG")} | وثيقة مالية رسمية صادرة من نظام إدارة الدواجن</div>
      <script>window.onload = function() { window.print(); };</script>
    </body></html>
  `);
  printWindow.document.close();
};

export const generateTraderStatementPdf = (traderData) => {
  if (!traderData) return;
  const { info = {}, roleLabel = "تاجر", operations = [], totalRevenue, totalVal, totalPaid, remainingDebt, totalQtyText = "-" } = traderData;
  const name = info.name || "كشف حساب متعامل";
  const phone = Array.isArray(info.phone_number) ? info.phone_number.join(" - ") : info.phone_number || "غير مسجل";
  const calcVal = (totalVal !== undefined && totalVal !== 0) ? totalVal : (totalRevenue !== undefined && totalRevenue !== 0 ? totalRevenue : operations.reduce((sum, o) => sum + (o.calculatedRevenue || o.calculatedTotal || o.total_price || o.total || o.amount || 0), 0));
  const calcPaid = (totalPaid !== undefined && totalPaid !== 0) ? totalPaid : operations.reduce((sum, o) => sum + (o.calculatedCollected || o.calculatedPaid || o.paid || 0), 0);
  const calcDebt = (remainingDebt !== undefined) ? remainingDebt : Math.max(0, calcVal - calcPaid);

  const isTrader = roleLabel.includes("تصدير") || roleLabel.includes("تاجر");
  const isFeed = roleLabel.includes("علف");

  const rows = operations.map((op, i) => {
    const gross = Math.round(Number(op.calculatedGrossWeight || op.gross_weights || 0));
    const tare = Math.round(Number(op.calculatedTareWeight || op.tare_weights || 0));
    const net = Math.round(Number(op.calculatedNetWeight || op.net_weight || 0));
    const birds = Number(op.calculatedBirdsCount || op.chick_count || op.bird_count || 0) || (Number(op.crates_count || 0) * Number(op.crate_capacity || 0));
    const price = Number(op.executionPrice || op.execution_price || op.sack_price || 0);
    const total = Math.round(Number(op.calculatedRevenue || op.calculatedTotal || op.total_price || op.total || 0));
    const paid = Math.round(Number(op.calculatedCollected || op.calculatedPaid || op.paid || 0));
    const debt = Math.round(Number(op.calculatedRemainingDebt || op.calculatedDebt || op.remaining || Math.max(0, total - paid)));
    const desc = op.item || op.feed_name || (op.driver_name ? `سيارة: ${op.car_number || "-"} (سائق: ${op.driver_name})` : (Array.isArray(op.Medicine) && op.Medicine.length ? op.Medicine.map(m=>m.name||m.medicine_name).join("، ") : "عملية مسجلة"));
    const qtyCol = isTrader ? `${net.toLocaleString()} كجم ${birds ? `(${birds.toLocaleString()} طير)` : ""}` : (op.sacks_count ? `${op.sacks_count} شكارة (${(op.sacks_count * 50 / 1000).toFixed(1)} طن)` : "-");

    return `
      <tr>
        <td>${i + 1}</td>
        <td>${op.date || (op.created_at ? new Date(op.created_at).toLocaleDateString("ar-EG") : "مسجل بالدورة")}</td>
        <td><strong>${desc}</strong></td>
        ${isTrader ? `<td>${gross && tare ? `${gross.toLocaleString()} / ${tare.toLocaleString()} كجم` : "-"}</td>` : ""}
        <td><strong>${qtyCol}</strong></td>
        <td>${price ? `${price.toFixed(2)} EGP` : "-"}</td>
        <td><strong>${formatEgp(total)}</strong></td>
        <td style="color:#16a34a">${formatEgp(paid)}</td>
        <td style="color:${debt > 0 ? '#dc2626' : '#16a34a'}"><strong>${formatEgp(debt)}</strong></td>
      </tr>
    `;
  }).join("");

  const printWindow = window.open("", "_blank", "width=900,height=1000");
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>كشف حساب - ${name}</title><style>${getPdfStyles()}</style></head>
    <body>
      <div class="brand-header">
        <div><h1 class="brand-title">منظومة مزارع الدواجن — كشف حساب رسمي ومطابقة ميزانية</h1><div class="brand-sub">اسم المتعامل: <strong>${name}</strong> | الصفة: <strong>${roleLabel}</strong> | العنوان: ${info.place || info.address || "غير محدد"} | الهاتف: ${phone}</div></div>
        <div><span class="badge ${calcDebt > 0 ? 'badge-unpaid' : 'badge-paid'}">${calcDebt > 0 ? `متبقي مديونية: ${formatEgp(calcDebt)}` : 'خالص ومسدد بالكامل'}</span></div>
      </div>
      <div class="summary-grid">
        <div class="summary-card"><div class="summary-label">إجمالي المعاملات</div><div class="summary-val">${formatEgp(calcVal)}</div></div>
        <div class="summary-card"><div class="summary-label">إجمالي المدفوعات</div><div class="summary-val" style="color:#16a34a">${formatEgp(calcPaid)}</div></div>
        <div class="summary-card"><div class="summary-label">الرصيد المتبقي</div><div class="summary-val" style="color:${calcDebt > 0 ? '#dc2626' : '#16a34a'}">${formatEgp(calcDebt)}</div></div>
        <div class="summary-card"><div class="summary-label">إجمالي الحجم / الكمية</div><div class="summary-val">${totalQtyText}</div></div>
      </div>
      <table>
        <thead><tr><th>#</th><th>التاريخ</th><th>البيان والسائق</th>${isTrader ? '<th>القائم / الطبلة</th>' : ''}<th>الصافي والكمية</th><th>السعر</th><th>الإجمالي</th><th>المدفوع</th><th>المتبقي</th></tr></thead>
        <tbody>${rows.length > 0 ? rows : '<tr><td colspan="9" style="text-align:center">لا توجد عمليات مسجلة له بالدورة</td></tr>'}</tbody>
      </table>
      <div class="signatures">
        <div class="sig-box"><div class="sig-title">توقيع المتعامل / التاجر</div><div class="sig-line">الإسم والتوقيع</div></div>
        <div class="sig-box"><div class="sig-title">اعتماد المحاسب المالي</div><div class="sig-line">توقيع إدارة المزرعة</div></div>
      </div>
      <div class="footer">تاريخ الطباعة: ${new Date().toLocaleDateString("ar-EG")} | كشف حساب معتمد مستخرج من المنظومة الرقمية للمزرعة</div>
      <script>window.onload = function() { window.print(); };</script>
    </body></html>
  `);
  printWindow.document.close();
};

export const generateCycleReportPdf = (metrics) => {
  if (!metrics) return;
  const cycleTitle = metrics.displayTitle || `الدورة رقم ${metrics.cycleId}`;
  const startDate = metrics.startedAt ? new Date(metrics.startedAt).toLocaleDateString("ar-EG") : "-";
  const endDate = metrics.endedAt ? new Date(metrics.endedAt).toLocaleDateString("ar-EG") : "مستمرة";
  const cards = metrics.cards || {};

  const printWindow = window.open("", "_blank", "width=900,height=1000");
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>التقرير المالي للدورة - ${cycleTitle}</title><style>${getPdfStyles()}</style></head>
    <body>
      <div class="brand-header">
        <div><h1 class="brand-title">منظومة مزارع الدواجن — التقرير المالي والإداري الشامل</h1><div class="brand-sub">بيانات ${cycleTitle} | تاريخ البدء: ${startDate} | تاريخ الانتهاء: ${endDate} | السلالة: ${metrics.chickType || "Cobb 500"}</div></div>
        <div><span class="badge ${cards.isProfit ? 'badge-paid' : 'badge-unpaid'}">${cards.isProfit ? `صافي أرباح: ${formatEgp(cards.netProfitLoss)}` : `خسارة: ${formatEgp(cards.netProfitLoss)}`}</span></div>
      </div>
      <div class="summary-grid">
        <div class="summary-card"><div class="summary-label">إجمالي مبيعات الدورة</div><div class="summary-val" style="color:#2563eb">${formatEgp(cards.totalSalesRevenue || 0)}</div></div>
        <div class="summary-card"><div class="summary-label">إجمالي التكلفة الكلية</div><div class="summary-val">${formatEgp(cards.totalCycleCost || 0)}</div></div>
        <div class="summary-card"><div class="summary-label">صافي الربح / الخسارة</div><div class="summary-val" style="color:${cards.isProfit ? '#16a34a' : '#dc2626'}">${formatEgp(cards.netProfitLoss || 0)}</div></div>
        <div class="summary-card"><div class="summary-label">السيولة النقدية بالصندوق</div><div class="summary-val" style="color:#059669">${formatEgp(cards.cashInBox || 0)}</div></div>
      </div>
      <div class="summary-grid">
        <div class="summary-card"><div class="summary-label">المدفوع من الجيب</div><div class="summary-val">${formatEgp(cards.outOfPocketPaid || 0)}</div></div>
        <div class="summary-card"><div class="summary-label">ديون المزرعة للموردين</div><div class="summary-val" style="color:#dc2626">${formatEgp(cards.debtsOwed || 0)}</div></div>
        <div class="summary-card"><div class="summary-label">مستحقات المزرعة لدى التجار</div><div class="summary-val" style="color:#2563eb">${formatEgp(cards.receivablesOwed || 0)}</div></div>
        <div class="summary-card"><div class="summary-label">معامل التحويل (FCR)</div><div class="summary-val">${metrics.feedFinancials?.finalFCR || 0}</div></div>
      </div>
      <div class="signatures">
        <div class="sig-box"><div class="sig-title">إعداد مدير المزرعة</div><div class="sig-line">التوقيع والاعتماد</div></div>
        <div class="sig-box"><div class="sig-title">المراجعة المالية والحسابات</div><div class="sig-line">توقيع المحاسب المالي</div></div>
      </div>
      <div class="footer">تاريخ الطباعة: ${new Date().toLocaleDateString("ar-EG")} | تقرير مالي رسمي شامل صادر من المنظومة الرقمية للمزرعة</div>
      <script>window.onload = function() { window.print(); };</script>
    </body></html>
  `);
  printWindow.document.close();
};
