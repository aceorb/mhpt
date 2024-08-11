"use client";

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react';

const OAuthPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (token) {
      // You can perform any action with the token here
      console.log('Token:', token);
      localStorage.setItem('authToken', token);
      router.push('/');
    }
  }, [token]);

  return (
    <div>
      </div>
  );
};

export default OAuthPage;