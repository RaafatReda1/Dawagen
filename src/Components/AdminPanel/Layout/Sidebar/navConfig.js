import { CalendarDays, Wheat, Syringe, Calculator, LayoutDashboard, History, TrendingUp } from "lucide-react";

export const getGeneralNavItems = () => [
  { path: "/cycles", icon: History, label: "الدورات السابقة" },
  { path: "/analytics", icon: TrendingUp, label: "التحليلات العامة" },
];

export const getCycleNavItems = (basePath = "/current-cycle") => [
  { path: basePath, icon: CalendarDays, label: "الايام والمتابعة" },
  { path: `${basePath}/feed`, icon: Wheat, label: "العلف والواردات" },
  { path: `${basePath}/drugs`, icon: Syringe, label: "الادوية والتحصينات" },
  { path: `${basePath}/export`, icon: Calculator, label: "حسابات التصدير" },
  { path: `${basePath}/overview`, icon: LayoutDashboard, label: "نظرة عامة والمالية" },
];
