import { Link } from 'react-router-dom';
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
      <div className="max-w-screen-xl mx-auto flex justify-between items-center py-3 px-10">
        <Link to="/" className="inline-flex gap-5">
          <img src="/react.svg" alt="icon" />
          <h1 className="text-xl md:text-2xl font-semibold">
            {import.meta.env.VITE_APP_TITLE}
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          {token && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-3" size="sm" variant="ghost">
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
