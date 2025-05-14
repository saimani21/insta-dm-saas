// src/lib/mailer.ts
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendCampaignEmail(to: string, subject: string, message: string) {
  try {
    const info = await transporter.sendMail({
      from: `"insta-dm-saas 👋" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: `<div style="font-family: sans-serif;">
               <h2>${subject}</h2>
               <p>${message}</p>
             </div>`,
    })

    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}
