import { Outlet } from 'react-router-dom';
import { AuthProvider, ThemeProvider } from '@/common/contexts';
import { Header } from './components';

export default function Layout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Header />

        {/* height of Outlet = screen size - (height of header + bottom border width) */}
        <div className="max-w-screen-xl mx-auto min-h-[calc(100svh_-_50px)] flex">
          <Outlet />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
