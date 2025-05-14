import { Metadata } from 'next'
import './globals.css'  // Import global Tailwind CSS styles

export const metadata: Metadata = {
  title: 'Instagram DM Campaigns',
  description: 'Mini SaaS to automate Instagram DMs (Simulation)'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
