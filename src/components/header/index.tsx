import {
  ComputerIcon,
  DarkModeIcon,
  LightModeIcon,
  LogoutIcon,
} from '@/assets/icons';
import { useAuth, useTheme } from '@/contexts';
import { Button } from '../ui/button';

export default function Header() {
  const { token, manageLogout } = useAuth();
  const { theme, setTheme } = useTheme();

  const handleLoginClick = () => {
    manageLogout();
  };

  const changeTheme = (newTheme: typeof theme) => {
    setTheme(newTheme);
  };

  return (
    <header className="sticky top-0 z-10 backdrop-blur border-b border-slate-900/10 dark:border-slate-50/10 bg-white dark:bg-slate-900/75">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-3">
        <h1 className="inline-flex gap-5">
          <img src="/react.svg" alt="icon" />
          <span className="text-xl md:text-2xl font-semibold">
            {import.meta.env.VITE_APP_TITLE}
          </span>
        </h1>

        <div className="flex items-center gap-2">
          {token && (
            <Button
              className="gap-3"
              size="sm"
              variant="ghost"
              onClick={handleLoginClick}
            >
              <LogoutIcon />
              <span className="hidden md:block">Logout</span>
            </Button>
          )}

          <Button
            size="icon"
            variant="ghost"
            disabled={theme === 'system'}
            onClick={() => changeTheme('system')}
          >
            <ComputerIcon />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            disabled={theme === 'light'}
            onClick={() => changeTheme('light')}
          >
            <LightModeIcon />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            disabled={theme === 'dark'}
            onClick={() => changeTheme('dark')}
          >
            <DarkModeIcon />
          </Button>
        </div>
      </div>
    </header>
  );
}
