import { Button } from '@/common/components/button';
import { useAuth } from '@/common/contexts';

export default function Auth() {
  const { manageLogin } = useAuth();

  const handleLoginClick = () => {
    manageLogin('sample-token');
  };

  return (
    <div className="flex justify-center items-center min-h-svh">
      <Button onClick={handleLoginClick}>Login</Button>
    </div>
  );
}
