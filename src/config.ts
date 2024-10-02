const BASE_URLS = {
  staging: "https://loyalty-plus-stg-api.insomnialabs.xyz",
  live: "https://api.loyaltyplus.com",
};

export interface Config {
  apiKey: string;
  apiUrl: string;
}

let config: Config = {
  apiKey: '',
  apiUrl: BASE_URLS.staging, // Default to staging URL
};

export const setConfig = (newConfig: Partial<Config>) => {
  config = { ...config, ...newConfig };
};


export const getConfig = (): Config => {
  return config;
};

export const getBaseUrl = (environment: "staging" | "live"): string => {
  return BASE_URLS[environment];
};
