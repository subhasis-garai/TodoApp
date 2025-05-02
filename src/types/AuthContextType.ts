// types/AuthContextType.ts
export interface AuthContextType {
    login: () => void;
    logout: () => void;
    isLoggedIn: boolean;
  }
  