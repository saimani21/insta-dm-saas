'use client'

import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function CampaignForm() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [recipients, setRecipients] = useState('') // comma-separated emails
  const [date, setDate] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name || !message || !recipients || !date) {
      alert('Please fill all fields.')
      return
    }

    try {
      const res = await fetch('/api/create-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          message,
          recipients, // string of emails
          date
        })
      })

      if (!res.ok) {
        throw new Error('Failed to create campaign')
      }

      setName('')
      setMessage('')
      setRecipients('')
      setDate('')
      alert('Campaign emails scheduled and sent!')
    } catch (err) {
      console.error('Error sending campaign:', err)
      alert('There was an error sending the campaign.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded border border-gray-300">
      <div className="space-y-1">
        <Label htmlFor="campaign-name">Campaign Title</Label>
        <Input
          id="campaign-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. New Feature Launch"
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="campaign-message">Message</Label>
        <Textarea
          id="campaign-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your campaign email content here..."
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="campaign-recipients">Recipient Emails (comma-separated)</Label>
        <Input
          id="campaign-recipients"
          type="text"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          placeholder="user1@example.com, user2@example.com"
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="campaign-date">Scheduled Date</Label>
        <Input
          id="campaign-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Send Campaign Emails
      </Button>
    </form>
  )
}
