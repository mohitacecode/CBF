export const ACTIVE_STEP = "[Builder] ACTIVE STEP";

export function setActiveStep(step) {
  return {
    type: ACTIVE_STEP,
    step,
  };
}
