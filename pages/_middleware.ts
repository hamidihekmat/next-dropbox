import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/dropbox') {
    console.log('Checking Session...');
    const session = await getToken({
      req: req as any,
      secret: process.env.SECRET!,
    });
    console.log(session);
    if (!session) {
      return NextResponse.redirect('/api/auth/signin');
    }
  }
}
