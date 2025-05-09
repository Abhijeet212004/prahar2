import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LegacyHome() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the home page in the App Router
    router.push('/');
  }, [router]);
  
  // This page will only be shown momentarily before redirecting
  return null;
}