import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: Request) {
  const cookieStore = cookies();
  console.log(cookieStore.get("authToken")?.value);

  const token =
    cookieStore.get("authToken")?.value || req.headers.get("Authorization");

  if (!token) {
    return NextResponse.redirect(new URL("auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};
