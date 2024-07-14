import { LoginIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts';

export default function Auth() {
  const { manageLogin } = useAuth();

  const handleLoginClick = () => {
    manageLogin('sample-token');
  };

  return (
    <div className="flex justify-center items-center w-full">
      <Button className="gap-3" onClick={handleLoginClick}>
        <LoginIcon />
        <span>Login</span>
      </Button>
    </div>
  );
}
