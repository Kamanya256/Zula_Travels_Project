import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";



export function middleware(
  request: NextRequest
) {


  const pathname =
    request.nextUrl.pathname;



  const isAdminRoute =
    pathname.startsWith(
      "/admin"
    );



  if (isAdminRoute) {


    /**
     * We cannot check localStorage here.
     * JWT is handled client side.
     *
     * Route protection happens
     * inside AuthGuard.
     */


    return NextResponse.next();


  }



  return NextResponse.next();

}





export const config = {


  matcher: [

    "/admin/:path*"

  ],


};