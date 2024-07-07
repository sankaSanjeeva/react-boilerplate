import { Button } from '@/common/components/button';
import { useAuth } from '@/common/contexts';

export default function Home() {
  const { manageLogout } = useAuth();

  const handleLoginClick = () => {
    manageLogout();
  };

  return (
    <div className="flex justify-center items-center min-h-svh">
      <Button onClick={handleLoginClick}>Logout</Button>
    </div>
  );
}
