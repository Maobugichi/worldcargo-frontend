import { NextRequest, NextResponse } from 'next/server';
import { notifyVisit } from '@/lib/notify-visit';

export async function POST(request: NextRequest) {
  const { trackingNumber } = await request.json();

  if (!trackingNumber || typeof trackingNumber !== 'string') {
    return NextResponse.json({ ok: false, error: 'Missing tracking number' }, { status: 400 });
  }

  const referrer = request.headers.get('referer') ?? 'direct';
  const userAgent = request.headers.get('user-agent') ?? 'unknown';
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';

  notifyVisit({ trackingNumber, referrer, userAgent, ip }).catch(() => {});

  return NextResponse.json({ ok: true });
}