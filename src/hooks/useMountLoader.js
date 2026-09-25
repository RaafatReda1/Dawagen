import { useState, useEffect } from "react";

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
