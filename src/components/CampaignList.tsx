'use client'

import { useEffect, useState } from 'react'
import CampaignCard from '@/components/CampaignCard'

interface Campaign {
  _id: string
  name: string
  message: string
  recipients: string[]
  scheduledFor: string
  status: string
}

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  // Function to fetch campaigns from the API
  const fetchCampaigns = async () => {
    try {
      const res = await fetch('/api/campaigns')
      if (!res.ok) {
        throw new Error('Failed to fetch campaigns')
      }
      const data = await res.json()
      setCampaigns(data)
    } catch (err) {
      console.error('Error fetching campaigns:', err)
    }
  }

  useEffect(() => {
    // Fetch campaigns initially
    fetchCampaigns()
    // Set up an interval to periodically refresh the list (every 10 seconds)
    const interval = setInterval(fetchCampaigns, 10000)
    return () => clearInterval(interval)  // cleanup on component unmount
  }, [])

  return (
    <div className="mt-6 space-y-4">
      {campaigns.map(campaign => (
        <CampaignCard key={campaign._id} campaign={campaign} />
      ))}
      {campaigns.length === 0 && (
        <p className="text-gray-600">No campaigns created yet.</p>
      )}
    </div>
  )
}
