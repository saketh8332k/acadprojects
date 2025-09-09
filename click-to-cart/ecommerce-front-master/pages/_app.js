// pages/_app.js
import { createGlobalStyle } from 'styled-components';
import { CartContextProvider } from '@/components/CartContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`;

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    console.log(`isAuthenticated: ${isAuthenticated}, pathname: ${router.pathname}`);
    if (isAuthenticated && router.pathname == '/login' && router.pathname == '/register') {
      router.replace('/home');
    }
  }, [router]);
};

function App({ Component, pageProps }) {
  useAuth();

  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}

export default App;
