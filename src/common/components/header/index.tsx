import Button from '@/common/components/button';
import { useAuth } from '@/common/contexts';

export default function Header() {
  const { token, manageLogout } = useAuth();

  const handleLoginClick = () => {
    manageLogout();
  };

  return (
    <header className="border-b-2 sticky top-0">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center h-12">
        <h1 className="text-2xl font-semibold">React Boilerplate</h1>
        {token && <Button onClick={handleLoginClick}>Logout</Button>}
      </div>
    </header>
  );
}
