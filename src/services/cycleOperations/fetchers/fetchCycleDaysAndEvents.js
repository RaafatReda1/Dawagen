import supabase from "../../../utils/supabase";

/**
 * Fetches Days, FollowUpData, Events, DailyExpenses, DrugWithdraw, and FoodWithdraw records
 * for a specific cycleId.
 */
export const fetchCycleDaysAndEvents = async (cycleId) => {
  const numericId = Number(cycleId);
  if (isNaN(numericId)) {
    return { days: [], events: [], dailyExpenses: [], drugWithdrawals: [], foodWithdrawals: [], followUpData: [] };
  }

  const { data: days, error: daysErr } = await supabase
    .from("Days")
    .select("*")
    .eq("cycle_id", numericId)
    .order("day_number", { ascending: true });

  if (daysErr) throw daysErr;
  if (!days || days.length === 0) {
    return { days: [], events: [], dailyExpenses: [], drugWithdrawals: [], foodWithdrawals: [], followUpData: [] };
  }

  const dayIds = days.map((d) => d.id);

  // Fetch Day-child tables (Events, FollowUpData)
  const [eventsRes, followUpRes] = await Promise.all([
    supabase.from("Events").select("*").in("parent_day_id", dayIds),
    supabase.from("FollowUpData").select("*").in("parent_day_id", dayIds),
  ]);

  if (eventsRes.error) throw eventsRes.error;
  if (followUpRes.error) throw followUpRes.error;

  const events = eventsRes.data || [];
  const followUpData = followUpRes.data || [];

  if (events.length === 0) {
    return { days, events: [], dailyExpenses: [], drugWithdrawals: [], foodWithdrawals: [], followUpData };
  }

  const eventIds = events.map((e) => e.id);

  // Fetch Event-child tables (DailyExpenses, DrugWithdraw, FoodWithdraw)
  const [expensesRes, drugWRes, foodWRes] = await Promise.all([
    supabase.from("DailyExpenses").select("*").in("parent_event_id", eventIds),
    supabase.from("DrugWithdraw").select("*, Medicine(*)").in("parent_event_id", eventIds),
    supabase.from("FoodWithdraw").select("*, FeedShipments(*)").in("parent_event_id", eventIds),
  ]);

  if (expensesRes.error) throw expensesRes.error;
  if (drugWRes.error) throw drugWRes.error;
  if (foodWRes.error) throw foodWRes.error;

  return {
    days,
    events,
    dailyExpenses: expensesRes.data || [],
    drugWithdrawals: drugWRes.data || [],
    foodWithdrawals: foodWRes.data || [],
    followUpData,
  };
};
