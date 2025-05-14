import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Campaign from '@/models/Campaign'

export async function GET() {
  try {
    await connectDB()
    // Update any campaigns whose scheduled time has passed and are still "Scheduled"
    const now = new Date()
    await Campaign.updateMany(
      { status: 'Scheduled', scheduledFor: { $lte: now } },
      { status: 'Sent' }
    )
    // Fetch all campaigns from the database, newest first
    const campaigns = await Campaign.find().sort({ createdAt: -1 }).lean()
    return NextResponse.json(campaigns)
  } catch (err) {
    console.error('Error fetching campaigns:', err)
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 })
  }
}
