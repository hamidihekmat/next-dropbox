import { NextPage } from 'next';
import { useSession, getCsrfToken } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Protected: NextPage = () => {
  const [token, setToken] = useState('');
  const { data: session } = useSession();
  useEffect(() => {
    async function getToken() {
      const fetchedToken = await getCsrfToken();
      if (fetchedToken) {
        setToken(fetchedToken);
      }
    }
    getToken();
  }, []);
  return (
    <div>
      <h1>Protected Route</h1>
      <p>{JSON.stringify(session)}</p>
      <p>{token}</p>
    </div>
  );
};

export default Protected;
