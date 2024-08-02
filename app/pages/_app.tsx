import { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useEffect } from 'react';

const protectedRoutes = ['/dashboard'];

const App = ({ Component, pageProps, router }: AppProps) => {
  const isProtectedRoute = protectedRoutes.includes(router.pathname);

  console.log('_ app loaded');
  useEffect(() => {
    console.log('_ app loaded');
  }, []);
  return (
    <AuthProvider>
      {isProtectedRoute ? (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthProvider>
  );
};

export default App;
