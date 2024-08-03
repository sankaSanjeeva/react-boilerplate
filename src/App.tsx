import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider, ThemeProvider } from './contexts';
import { Breadcrumbs, Header } from './components';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Header />
          <div className="max-w-screen-xl mx-auto p-2 md:p-5">
            <Breadcrumbs />
            <Outlet />
          </div>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen buttonPosition="bottom-left" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
