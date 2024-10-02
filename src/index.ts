import { init as initAuth, login, logout } from "./auth";
import { getBaseUrl, setConfig } from "./config";
import { registerEvent, setProjectId } from "./events";

export const init = (
  apiKey: string,
  environment: "staging" | "live",
  projectId: string
) => {
  initAuth(apiKey, environment, projectId);

  const apiUrl = getBaseUrl(environment);
  setConfig({ apiUrl, apiKey });
  setProjectId(projectId);
};

export { login, logout, registerEvent };
