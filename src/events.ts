import axios from "axios";
import { AuthError, ValidationError } from "./errors";
import { getAuthToken } from "./auth";
import { getConfig } from "./config";

let projectId: string | null = null;

export const setProjectId = (projId: string) => {
  projectId = projId;
};

export const registerEvent = async (
  eventName: string,
  userId: string
): Promise<void> => {
  if (!projectId)
    throw new AuthError(
      "Project ID is not set. Please initialize the SDK first."
    );
  if (!eventName) {
    throw new ValidationError("Event name is required.");
  }
  if (!userId) {
    throw new ValidationError("User ID is required.");
  }

  const authToken = getAuthToken();
  if (!authToken) {
    throw new AuthError("User is not authenticated. Please login first.");
  }

  const { apiUrl, apiKey } = getConfig();
  try {
    await axios.post(
      `${apiUrl}/projects/${projectId}/users/events`,
      { name: eventName, userId },
      { headers: { Authorization: `Bearer ${authToken}`, "x-api-key": apiKey } }
    );
    console.log(`Event "${eventName}" registered successfully.`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new AuthError(
        `Failed to register event: ${
          error.response?.data?.message || error.message
        }`
      );
    } else {
      throw new AuthError(`Failed to register event: ${String(error)}`);
    }
  }
};
