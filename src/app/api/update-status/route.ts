import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'

import Campaign from '@/models/Campaign'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, status } = body  // expecting an id of campaign and a new status

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 })
    }

    await connectDB()
    const campaign = await Campaign.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    )
    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
    }
    return NextResponse.json({ message: `Status updated to ${status}`, campaign })
  } catch (err) {
    console.error('Error updating status:', err)
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
  }
}
