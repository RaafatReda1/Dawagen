import { useState, useEffect } from "react";

/**
 * useMountLoader
 * Automatically steps through an array of loading operations.
 * Yields the main thread between steps to allow the browser to paint the loading UI.
 * 
 * @param {Array} steps Array of { message, delay, action: async () => void }
 * @param {boolean} start Whether to start the loader (default true)
 * @returns {object} { isComplete, currentStepIndex, stepMessage, progress }
 */
export const useMountLoader = (steps = [], start = true) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    if (!start || steps.length === 0) return;

    const executeSteps = async () => {
      setIsComplete(false);
      
      for (let i = 0; i < steps.length; i++) {
        if (!isMounted) break;
        setCurrentStep(i);
        
        // Yield the thread so the browser can paint the new step message
        // Default delay is 100ms if not specified to ensure smooth UI update
        await new Promise(res => setTimeout(res, steps[i].delay !== undefined ? steps[i].delay : 150));
        
        if (!isMounted) break;
        
        // Execute the heavy synchronous or asynchronous action for this step
        if (steps[i].action) {
          // If action returns a promise, await it. If sync, it runs here.
          await Promise.resolve(steps[i].action());
        }
      }
      
      if (isMounted) setIsComplete(true);
    };
    
    executeSteps();
    
    return () => { isMounted = false; };
  }, [start]); // We intentionally do not depend on `steps` to avoid re-triggering unless `start` changes

  return { 
    isComplete, 
    currentStepIndex: currentStep + 1, 
    stepMessage: steps[currentStep]?.message || "",
    progress: steps.length ? Math.min(100, Math.round(((currentStep + 1) / steps.length) * 100)) : 100
  };
};
