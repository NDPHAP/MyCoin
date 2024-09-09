const API_URL_DEV = "";
const API_URL_LOCAL = "http://localhost:3001";
export const APP_ENV = "local" as string;
export const API_URL = APP_ENV === "local" ? API_URL_LOCAL : API_URL_DEV;
