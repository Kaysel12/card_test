import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
	"/"
];

export function isPublic(path: string) {
	return PUBLIC_PATHS.some((p) => path === p || path.startsWith(p + "/"));
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (isPublic(pathname)) {
		return redirectToDashboard(request);
	}

}

function redirectToDashboard(request: NextRequest) {
	const url = request.nextUrl.clone();
	url.pathname = "/dashboard";
	return NextResponse.redirect(url);
}

export const config = {
	matcher: ["/((?!api|_next|favicon.ico|assets).*)"],
};
