import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'wildanibnujamil30@gmail.com';

    if (RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resendClient = new Resend({ apiKey: RESEND_API_KEY });
      const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
      
      const emailData = await resendClient.emails.send({
        from: fromEmail,
        to: RECIPIENT_EMAIL,
        subject: `New Contact Form Message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              New Contact Form Message
            </h2>
            <div style="margin-top: 20px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Message:</strong></p>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <p style="margin-top: 20px; color: #666; font-size: 12px;">
              This message was sent from your portfolio contact form.
            </p>
          </div>
        `,
        replyTo: email,
      });

      if (emailData.error) {
        throw new Error(emailData.error.message || 'Failed to send email');
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Email sent successfully',
        id: emailData.data?.id 
      });
    } else {
      return NextResponse.json({ 
        success: true, 
        message: 'Message received. Please configure RESEND_API_KEY in environment variables to enable email sending.',
        warning: 'Email service not configured'
      });
    }
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error.message },
      { status: 500 }
    );
  }
}

