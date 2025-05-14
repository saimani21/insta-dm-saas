import React from 'react'

interface CampaignProps {
  campaign: {
    _id: string
    name: string
    message: string
    recipients: string[]
    scheduledFor: string
    status: string
  }
}

export default function CampaignCard({ campaign }: CampaignProps) {
  const { name, message, recipients, scheduledFor, status } = campaign

  return (
    <div className="rounded-lg border border-gray-300 p-4">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p><strong>Message:</strong> {message}</p>
      <p><strong>Recipients:</strong> {recipients.join(', ')}</p>
      <p><strong>Scheduled For:</strong> {new Date(scheduledFor).toLocaleDateString()}</p>
      <p>
        <strong>Status:</strong>{' '}
        {status === 'Sent'
          ? <span className="text-green-600">Sent ✅</span>
          : <span className="text-blue-600">Scheduled ⏳</span>}
      </p>
    </div>
  )
}
