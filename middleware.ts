import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { Account } from './prisma/generated/client'
import { ROUTE_MAP } from './shared/config/routes'

export default withAuth(
	function middleware(req) {
		const token = req.nextauth.token
		const isAdminRoute = req.nextUrl.pathname.startsWith(ROUTE_MAP.admin.root)

		// Access role from the nested 'user' object defined in your jwt callback
		const userRole = (token?.user as Account)?.role

		if (isAdminRoute && userRole !== 'ADMIN') {
			return NextResponse.redirect(new URL(ROUTE_MAP.home, req.url))
		}

		return NextResponse.next()
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
	},
)

export const config = {
	matcher: [
		'/admin/:path*',
		'/profile/:path*',
		'/cart/:path*',
		'/checkout/:path*',
		'/orders/:path*',
	],
}
