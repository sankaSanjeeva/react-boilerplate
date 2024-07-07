import { createContext, useContext, useMemo, useState } from 'react';

const STORAGE_KEYS = {
  TOKEN: 'token',
};

type AuthProviderState = {
  token: string | null;
  manageLogin: (token: AuthProviderState['token']) => void;
};

const initialState: AuthProviderState = {
  token: null,
  manageLogin: () => {},
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<AuthProviderState['token']>(() =>
    localStorage.getItem(STORAGE_KEYS.TOKEN)
  );

  const manageLogin = (tkn: AuthProviderState['token']) => {
    setToken(tkn);

    if (tkn) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, tkn);
    } else {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
    }
  };

  const value = useMemo(() => ({ token, manageLogin }), [token]);

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined)
    throw new Error('useAuth must be used within a AuthProvider');

  return context;
};
