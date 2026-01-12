import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject: formSubject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'System requirement: Identity, Email, and Message are mandatory.' },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'wildanibnujamil30@gmail.com';

    if (RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resendClient = new Resend(RESEND_API_KEY);
      const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

      const emailData = await resendClient.emails.send({
        from: fromEmail,
        to: RECIPIENT_EMAIL,
        subject: `[PROJ INQUIRY] ${formSubject || 'General Collaboration'} - from ${name}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
            <div style="background-color: #000; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #fff; margin: 0; font-size: 20px; letter-spacing: 2px; text-transform: uppercase;">Technical Inquiry</h1>
            </div>
            <div style="padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 8px 8px;">
              <p style="margin-bottom: 25px;">You have received a new collaborative inquiry via the portfolio interface.</p>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; width: 150px;"><strong>Client/Org:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong>Email:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong>Scope:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${formSubject || 'N/A'}</td>
                </tr>
              </table>

              <div style="margin-top: 30px;">
                <p style="margin-bottom: 10px;"><strong>Technical Overview:</strong></p>
                <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; border-left: 4px solid #000; font-style: italic;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>

              <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; font-size: 11px; color: #999;">
                <p>This inquiry was dispatched from the Mechanical Innovation Hub (Wildan Ibnu Jamil Portfolio).</p>
              </div>
            </div>
          </div>
        `,
        replyTo: email,
      });

      if (emailData.error) {
        throw new Error(emailData.error.message || 'Dispatch error at email gateway.');
      }

      return NextResponse.json({
        success: true,
        message: 'Inquiry successfully dispatched to the engineering queue.',
        id: emailData.data?.id
      });
    } else {
      return NextResponse.json({
        success: true,
        message: 'Inquiry cached. Please configure RESEND_API_KEY to active production mail.',
        warning: 'Email service inactive'
      });
    }
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Critical failure at dispatch gateway.', details: error.message },
      { status: 500 }
    );
  }
}
