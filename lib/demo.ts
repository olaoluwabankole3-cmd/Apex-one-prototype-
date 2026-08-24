export function isDemoMode(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("apex_demo_mode") === "true";
}

export function setDemoMode(enabled: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem("apex_demo_mode", enabled ? "true" : "false");
  window.dispatchEvent(new Event("storage"));
}
