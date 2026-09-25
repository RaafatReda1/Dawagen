import { fetchCycleCore } from "./fetchCycleCore";
import { fetchCycleDaysAndEvents } from "./fetchCycleDaysAndEvents";
import { fetchCycleFinances } from "./fetchCycleFinances";

/**
 * Master Raw Data Fetcher
 * Queries every single table in the database for a specific cycleId.
 */
export const fetchFullCycleRawData = async (cycleId) => {
  if (!cycleId) return null;

  try {
    const cycle = await fetchCycleCore(cycleId);
    if (!cycle) return null;

    const [daysAndEvents, finances] = await Promise.all([
      fetchCycleDaysAndEvents(cycleId),
      fetchCycleFinances(cycleId),
    ]);

    return {
      cycle,
      ...daysAndEvents,
      ...finances,
    };
  } catch (err) {
    console.error(`Error fetching full cycle raw data for cycle #${cycleId}:`, err);
    throw err;
  }
};
