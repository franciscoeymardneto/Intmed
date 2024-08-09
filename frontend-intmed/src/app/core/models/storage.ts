import { UserSession } from "./session";

export interface BrowserStorage {
  getUserSession: () => UserSession
  setUserSession: (value: UserSession) => void
  clearSession: () => void
}
