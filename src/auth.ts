import axios from "axios";
import { AuthError } from "./errors";

let authToken: string | null = null;
let projectId: string | null = null;

export const init = (
  apiKey: string,
  environment: "staging" | "live",
  projId: string
) => {
  if (!apiKey || !["staging", "live"].includes(environment)) {
    throw new AuthError("Invalid API key or environment.");
  }
  if (!projId) {
    throw new AuthError("Project ID is required for initialization.");
  }

  projectId = projId;

  console.log(
    `Initialized with API Key: ${apiKey}, Project ID: ${projectId}, in ${environment} mode`
  );
};

export const login = async (userId: string): Promise<string> => {
  if (!projectId)
    throw new AuthError(
      "Project ID is not set. Please initialize the SDK first."
    );
  if (!userId) throw new AuthError("User ID is required for login.");

  try {
    const response = await axios.post(
      `https://api.loyaltyplus.com/projects/${projectId}/users/auth-tokens`,
      { userId }
    );
    authToken = response.data.authToken;
    if (!authToken) {
      throw new AuthError("Failed to obtain authentication token.");
    }

    return authToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new AuthError(
        `Login failed: ${error.response?.data?.message || error.message}`
      );
    } else {
      throw new AuthError(`Login failed: ${String(error)}`);
    }
  }
};

export const logout = () => {
  authToken = null;
  console.log("Logged out and cleared auth token.");
};

export const getAuthToken = (): string | null => authToken;
