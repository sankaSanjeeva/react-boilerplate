import { Link, NavLink } from 'react-router-dom';
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { cn } from '@/utils/style';

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
      <div className="max-w-screen-xl mx-auto flex items-center py-3 px-10">
        <Link to="/home" className="inline-flex gap-5">
          <img src="/react.svg" alt="icon" />
          <h1 className="text-xl md:text-2xl font-semibold">
            {import.meta.env.VITE_APP_TITLE}
          </h1>
        </Link>

        {token && (
          <NavLink
            to="/home"
            className={({ isActive }) =>
              cn(
                'mx-10 font-semibold transition-colors',
                isActive
                  ? 'text-gray-900 dark:text-gray-100'
                  : 'text-gray-900/50 dark:text-gray-100/75'
              )
            }
          >
            Docs
          </NavLink>
        )}

        <div className="flex items-center gap-2 ml-auto">
          {token && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="gap-3"
                  size="sm"
                  variant="ghost"
                  data-testid="logout-button"
                >
                  <LogoutIcon />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription className="!mt-4">
                    This will be returned to the login screen.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button onClick={handleLoginClick}>Logout</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" data-testid="theme-button">
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
