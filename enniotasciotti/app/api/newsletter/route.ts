import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendNewsletterWelcome } from '@/lib/email';

const schema = z.object({
  email: z.string().email(),
  locale: z.enum(['it', 'en']).default('it'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    await sendNewsletterWelcome(data);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', issues: err.issues }, { status: 422 });
    }
    console.error('Newsletter error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
