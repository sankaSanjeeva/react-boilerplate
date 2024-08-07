import { LoginIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts';

export default function Login() {
  const { manageLogin } = useAuth();

  const handleLoginClick = () => {
    manageLogin('sample-token');
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[calc(100svh_-_105px)]">
      <Button className="gap-3" onClick={handleLoginClick}>
        <LoginIcon />
        <span>Login</span>
      </Button>
    </div>
  );
}
