import { Schema, model, models } from 'mongoose'

interface ICampaign {
  name: string
  message: string
  recipients: string[]
  scheduledFor: Date
  status: string
}

// Define the schema for Campaign documents
const CampaignSchema = new Schema<ICampaign>(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    recipients: { type: [String], required: true },  // array of usernames
    scheduledFor: { type: Date, required: true },
    status: { type: String, required: true, default: 'Scheduled' }
  },
  { timestamps: true }
)

// In development, prevent model overwrite if already exists
const Campaign = models.Campaign || model<ICampaign>('Campaign', CampaignSchema)
export default Campaign
