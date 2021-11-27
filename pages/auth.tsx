import { NextPage } from 'next';
import { signIn, signOut } from 'next-auth/react';

const Auth: NextPage = () => {
  return (
    <div>
      <button onClick={() => signIn('google', { callbackUrl: '/' })}>
        Sign In
      </button>
      <button onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</button>
    </div>
  );
};

export default Auth;
