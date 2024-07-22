import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider, ThemeProvider } from './contexts';
import { Header } from './components';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Header />
          {/* height of Outlet = screen size - (height of header + bottom border width) */}
          <div className="max-w-screen-xl mx-auto min-h-[calc(100svh_-_65px)] flex">
            <Outlet />
          </div>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen buttonPosition="bottom-left" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
