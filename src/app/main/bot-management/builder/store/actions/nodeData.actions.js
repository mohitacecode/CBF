export const START_LOADING = "[Builder] START LOADING";
export const STOP_LOADING = "[Builder] STOP LOADING";

export function StartLoading(node) {
  return {
    type: START_LOADING,
  };
}

export function StopLoading() {
  return {
    type: STOP_LOADING,
  };
}
