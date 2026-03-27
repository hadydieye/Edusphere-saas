import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (toSet) =>
          toSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          ),
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const isSuperAdmin = user?.app_metadata?.superadmin === true;
  const isSchoolAdmin = user?.app_metadata?.school_admin === true;

  // ── Super Admin routes ────────────────────────────────────────────────────
  if (pathname.startsWith('/super-admin')) {
    const isLoginPage = pathname === '/super-admin/login';
    if (isLoginPage) {
      if (isSuperAdmin) return NextResponse.redirect(new URL('/super-admin', request.url));
      return response;
    }
    if (!user || !isSuperAdmin) return NextResponse.redirect(new URL('/super-admin/login', request.url));
    return response;
  }

  // ── School Admin routes ───────────────────────────────────────────────────
  if (pathname.startsWith('/school-admin')) {
    const publicPaths = ['/school-admin/login', '/school-admin/forgot-password', '/school-admin/reset-password'];
    const isPublic = publicPaths.includes(pathname);
    if (isPublic) {
      if (isSchoolAdmin && pathname === '/school-admin/login') return NextResponse.redirect(new URL('/school-admin', request.url));
      return response;
    }
    if (!user || !isSchoolAdmin) return NextResponse.redirect(new URL('/school-admin/login', request.url));
    return response;
  }

  return response;
}

export const config = {
  matcher: ['/super-admin/:path*', '/school-admin/:path*'],
};
