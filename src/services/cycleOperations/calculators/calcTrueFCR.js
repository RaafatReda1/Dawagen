export const calcTrueFCR = (totalKgConsumed = 0, initialChicks = 0, finalNetKg = 0, livingChicks = 0, avgWeightKg = 0) => {
  const initialChickWeightKg = 0.045; // 45g standard day-old chick
  const initialBiomassKg = initialChicks * initialChickWeightKg;
  const finalBiomassKg = finalNetKg > 0 ? finalNetKg : livingChicks * avgWeightKg;
  const liveWeightGainKg = Math.max(1, finalBiomassKg - initialBiomassKg);
  const biologicalFCR = liveWeightGainKg > 0 ? parseFloat((totalKgConsumed / liveWeightGainKg).toFixed(2)) : null;

  return {
    initialBiomassKg: parseFloat(initialBiomassKg.toFixed(2)),
    finalBiomassKg: parseFloat(finalBiomassKg.toFixed(2)),
    liveWeightGainKg: parseFloat(liveWeightGainKg.toFixed(2)),
    biologicalFCR,
  };
};
