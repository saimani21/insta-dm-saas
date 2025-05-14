import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Campaign from '@/models/Campaign'
import nodemailer from 'nodemailer'

// Environment variables
const { EMAIL_USER, EMAIL_PASS } = process.env

// Email sender setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, message, recipients, date } = body

    if (!name || !message || !recipients || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await connectDB()

    const recipientsArray = typeof recipients === 'string'
      ? recipients.split(',').map((r: string) => r.trim()).filter(Boolean)
      : recipients

    const scheduledDate = new Date(date)

    // Save campaign in MongoDB
    const newCampaign = await Campaign.create({
      name,
      message,
      recipients: recipientsArray,
      scheduledFor: scheduledDate,
      status: 'Scheduled'
    })

    // Send email to each recipient immediately (simulation)
    for (const recipient of recipientsArray) {
      try {
        await transporter.sendMail({
          from: `"MailFlow Campaigns" <${EMAIL_USER}>`,
          to: recipient,
          subject: `📢 ${name}`,
          text: message,
          html: `<p>${message}</p>`,
        })
        console.log(`✅ Email sent to ${recipient}`)
      } catch (emailErr) {
        console.error(`❌ Failed to send email to ${recipient}:`, emailErr)
      }
    }

    return NextResponse.json({ success: true, campaign: newCampaign })
  } catch (err) {
    console.error('❌ Error creating campaign:', err)
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 })
  }
}