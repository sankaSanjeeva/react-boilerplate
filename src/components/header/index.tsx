import {
  ComputerIcon,
  DarkModeIcon,
  LightModeIcon,
  LogoutIcon,
} from '@/assets/icons';
import { useAuth, useTheme } from '@/contexts';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                {/* eslint-disable-next-line no-nested-ternary */}
                {theme === 'dark' ? (
                  <DarkModeIcon />
                ) : theme === 'light' ? (
                  <LightModeIcon />
                ) : (
                  <ComputerIcon />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={theme === 'dark'}
                onClick={() => changeTheme('dark')}
              >
                <DarkModeIcon className="mr-2 h-5 w-5" />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={theme === 'light'}
                onClick={() => changeTheme('light')}
              >
                <LightModeIcon className="mr-2 h-5 w-5" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={theme === 'system'}
                onClick={() => changeTheme('system')}
              >
                <ComputerIcon className="mr-2 h-5 w-5" />
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
