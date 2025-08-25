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




// Body: {
//     event: 'entry.publish',
//     createdAt: '2025-08-25T21:59:08.927Z',
//     model: 'form',
//     uid: 'api::form.form',
//     entry: {
//       id: 10,
//       documentId: 'ob0cf8k9muo1yqc8hzrtvbmc',
//       ParticipantName: 'jhaf',
//       RegistrationNumber: 'jsajdhjhfv',
//       createdAt: '2025-08-25T21:59:08.908Z',
//       updatedAt: '2025-08-25T21:59:08.908Z',
//       publishedAt: '2025-08-25T21:59:08.915Z',
//       Email: 'ayush2422005@gmail.com',
//       Contact: '1234567890',
//       event: null,
//       Resume: null
//     }
//   }