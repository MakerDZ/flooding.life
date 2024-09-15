import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
    const donorToken = req.cookies.get('donorToken')?.value;
    return NextResponse.redirect(
        `${req.nextUrl.origin}/?session=${donorToken}`
    );
}

export const config = {
    matcher: ['/checkout'],
};
