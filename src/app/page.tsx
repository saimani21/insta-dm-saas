import React from 'react'
import CampaignForm from '@/components/CampaignForm'
import CampaignList from '@/components/CampaignList'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          📬 Instagram DM Campaigns
        </h1>

        {/* Campaign creation form */}
        <section className="mb-10 bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Campaign</h2>
          <CampaignForm />
        </section>

        {/* List of existing campaigns */}
        <section className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Your Campaigns</h2>
          <CampaignList />
        </section>
      </div>
    </main>
  )
}
