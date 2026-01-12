import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nama, Email, dan Pesan wajib diisi.' },
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
        subject: `[Portfolio Contact] ${subject || 'New Message'} from ${name}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #000; color: #fff; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 20px;">Pesan Kontak Baru</h1>
              <p style="margin: 5px 0 0; opacity: 0.8; font-size: 14px;">Portofolio Wildan Ibnu Jamil</p>
            </div>
            <div style="padding: 30px;">
              <div style="margin-bottom: 25px;">
                <p style="margin: 0; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Pengirim</p>
                <p style="margin: 5px 0; font-size: 16px; font-weight: bold;">${name}</p>
                <p style="margin: 0; font-size: 14px; color: #007bff;"><a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></p>
              </div>
              
              <div style="margin-bottom: 25px;">
                <p style="margin: 0; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subjek</p>
                <p style="margin: 5px 0; font-size: 16px;">${subject || 'Tanpa Subjek'}</p>
              </div>

              <div style="margin-bottom: 10px;">
                <p style="margin: 0; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Isi Pesan</p>
                <div style="margin-top: 10px; background-color: #f9f9f9; padding: 20px; border-radius: 8px; font-size: 15px; line-height: 1.6; color: #444; border-left: 4px solid #000;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
            </div>
            <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 11px; color: #888;">
              Pesan ini dikirim secara otomatis melalui formulir kontak portofolio Anda.
            </div>
          </div>
        `,
        replyTo: email,
      });

      if (emailData.error) {
        throw new Error(emailData.error.message || 'Gagal mengirim email melalui layanan Resend.');
      }

      return NextResponse.json({
        success: true,
        message: 'Email berhasil terkirim.',
        id: emailData.data?.id
      });
    } else {
      // Logic fallback if API key not set (production should have it)
      console.warn('RESEND_API_KEY is missing. Email simulation mode active.');
      return NextResponse.json({
        success: true,
        message: 'Pesan diterima (Simulasi). Tambahkan RESEND_API_KEY untuk pengiriman email aktif.',
        simulated: true
      });
    }
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Gagal memproses permintaan email.', details: error.message },
      { status: 500 }
    );
  }
}

