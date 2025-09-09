// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated");
    if (isAuthenticated) {
      router.push('/login');
    } else {
      router.push('/home');
    }
  }, []);

  return null; // This component doesn't render anything
}
