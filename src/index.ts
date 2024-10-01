import { init as initAuth, login, logout } from "./auth";
import { registerEvent, setProjectId } from "./events";

export const init = (
  apiKey: string,
  environment: "staging" | "live",
  projectId: string
) => {
  initAuth(apiKey, environment, projectId);

  setProjectId(projectId);
};

export { login, logout, registerEvent };
