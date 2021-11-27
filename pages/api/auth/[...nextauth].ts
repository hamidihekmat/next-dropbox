import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth',
    signOut: '/auth',
  },
  jwt: {
    secret: process.env.SECRET,
  },
  secret: process.env.SECRET,
});
