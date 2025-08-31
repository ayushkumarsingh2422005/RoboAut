import { NextRequest, NextResponse } from 'next/server';
import { sendFormEmail } from '@/utils/sendEmail';
export async function POST(request: NextRequest) {
  try {
    // Get and log the request body
    const body = await request.json().catch(() => null);
    console.log('📦 Request Body:', body);
    if (body.model === 'form' && body.event === 'entry.create') {
        const name = body.entry.ParticipantName;
        const registrationNumber = body.entry.RegistrationNumber;
        const email = body.entry.Email;
        const phone = body.entry.Contact;
        const event = body.entry.event;
        const emailResult = await sendFormEmail(name, registrationNumber, email, phone, event);
        console.log('📧 Email result:', emailResult);
    }

    return NextResponse.json({
      success: true,
      message: 'POST request received and logged successfully',
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Error processing POST request:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process POST request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
