import { buildDailyFeedMap } from "./buildDailyFeedMap";
import { calcFCRTimeline } from "./calcFCRTimeline";

export const calcDailyFCR = (days = [], events = [], foodWithdrawals = [], feedShipments = [], followUpData = [], dailyMortalityBreakdown = []) => {
  const feedShipmentsMap = new Map(feedShipments.map((fs) => [Number(fs.id), fs]));
  const eventsById = new Map(events.map((evt) => [Number(evt.id), evt]));
  const followUpByDayId = new Map(followUpData.map((fu) => [Number(fu.parent_day_id), fu]));
  const mortalityByDayId = new Map(dailyMortalityBreakdown.map((mb) => [Number(mb.dayId), mb]));

  const dailyFeedMap = buildDailyFeedMap(foodWithdrawals, eventsById, feedShipmentsMap);
  const sortedDays = [...days].sort((a, b) => Number(a.day_number) - Number(b.day_number));
  const { timeline, cumulativeSacks, cumulativeKg } = calcFCRTimeline(sortedDays, dailyFeedMap, mortalityByDayId, followUpByDayId);

  const latestDayFCR = timeline.length > 0 ? timeline[timeline.length - 1].dailyFCR : null;

  return {
    totalSacksConsumed: cumulativeSacks,
    totalKgConsumed: cumulativeKg,
    finalFCR: latestDayFCR,
    dailyFCRTimeline: timeline,
  };
};
