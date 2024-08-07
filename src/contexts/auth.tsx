import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEYS = {
  TOKEN: 'token',
};

type AuthProviderState = {
  token: string | null;
  manageLogin: (token: string) => void;
  manageLogout: () => void;
};

const initialState: AuthProviderState = {
  token: null,
  manageLogin: () => {},
  manageLogout: () => {},
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<AuthProviderState['token']>(() =>
    localStorage.getItem(STORAGE_KEYS.TOKEN)
  );

  const navigate = useNavigate();

  const manageLogin = useCallback(
    (tkn: string) => {
      if (!tkn) {
        throw new Error('A token is required');
      }

      localStorage.setItem(STORAGE_KEYS.TOKEN, tkn);
      setToken(tkn);
      navigate('/home');
    },
    [navigate]
  );

  const manageLogout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    setToken(null);
    navigate('/auth');
  }, [navigate]);

  const value = useMemo(
    () => ({ token, manageLogin, manageLogout }),
    [manageLogin, manageLogout, token]
  );

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
