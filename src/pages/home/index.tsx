import { Button } from '@/common/components';
import { useTheme } from '@/common/contexts';

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col justify-center items-center gap-5 w-full">
      <h1 className="text-2xl font-semibold">Change theme</h1>
      <div className="flex gap-5">
        <Button
          onClick={() => setTheme('system')}
          disabled={theme === 'system'}
        >
          System Theme
        </Button>
        <Button onClick={() => setTheme('dark')} disabled={theme === 'dark'}>
          Dark Theme
        </Button>
        <Button onClick={() => setTheme('light')} disabled={theme === 'light'}>
          Light Theme
        </Button>
      </div>
    </div>
  );
}
