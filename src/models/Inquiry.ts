import mongoose from 'mongoose';

export interface IInquiry extends mongoose.Document {
  property: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'responded' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new mongoose.Schema<IInquiry>({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: [1000, 'Message cannot be more than 1000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'responded', 'closed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Indexes
InquirySchema.index({ property: 1 });
InquirySchema.index({ user: 1 });
InquirySchema.index({ createdAt: -1 });

export default mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);