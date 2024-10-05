import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { TOKEN_STORAGE_KEY } from '@/constants';

type AuthProviderState = {
  token: string | null;
  manageLogin: (token: string) => void;
  manageLogout: () => void;
};

const AuthProviderContext = createContext<AuthProviderState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<AuthProviderState['token']>(() =>
    localStorage.getItem(TOKEN_STORAGE_KEY)
  );

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const manageLogin = useCallback(
    (tkn: string) => {
      if (!tkn) {
        throw new Error('A token is required');
      }

      localStorage.setItem(TOKEN_STORAGE_KEY, tkn);
      setToken(tkn);
      navigate('/home');
    },
    [navigate]
  );

  const manageLogout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    queryClient.clear();
    navigate('/auth');
  }, [navigate, queryClient]);

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

  if (!context) throw new Error('useAuth must be used within a AuthProvider');

  return context;
};
