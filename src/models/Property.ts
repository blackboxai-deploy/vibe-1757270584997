import mongoose from 'mongoose';

export interface IProperty extends mongoose.Document {
  title: string;
  description: string;
  price: number;
  type: 'rent' | 'buy';
  category: 'residential' | 'commercial';
  propertyType: 'apartment' | 'house' | 'villa' | 'office' | 'shop' | 'warehouse';
  bhk?: number;
  area: number;
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  images: string[];
  amenities: string[];
  features: string[];
  owner: mongoose.Types.ObjectId;
  isApproved: boolean;
  isFeatured: boolean;
  status: 'active' | 'sold' | 'rented' | 'inactive';
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema = new mongoose.Schema<IProperty>({
  title: {
    type: String,
    required: [true, 'Property title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Property description is required'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  type: {
    type: String,
    required: [true, 'Property type is required'],
    enum: ['rent', 'buy']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['residential', 'commercial']
  },
  propertyType: {
    type: String,
    required: [true, 'Property type is required'],
    enum: ['apartment', 'house', 'villa', 'office', 'shop', 'warehouse']
  },
  bhk: {
    type: Number,
    min: [1, 'BHK must be at least 1'],
    max: [10, 'BHK cannot be more than 10']
  },
  area: {
    type: Number,
    required: [true, 'Area is required'],
    min: [1, 'Area must be at least 1 sq ft']
  },
  location: {
    address: {
      type: String,
      required: [true, 'Address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
      match: [/^[0-9]{6}$/, 'Please provide a valid 6-digit pincode']
    },
    coordinates: {
      latitude: {
        type: Number,
        required: true,
        min: [-90, 'Latitude must be between -90 and 90'],
        max: [90, 'Latitude must be between -90 and 90']
      },
      longitude: {
        type: Number,
        required: true,
        min: [-180, 'Longitude must be between -180 and 180'],
        max: [180, 'Longitude must be between -180 and 180']
      }
    }
  },
  images: [{
    type: String,
    required: true
  }],
  amenities: [String],
  features: [String],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'sold', 'rented', 'inactive'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better search performance
PropertySchema.index({ location: 1 });
PropertySchema.index({ price: 1 });
PropertySchema.index({ type: 1 });
PropertySchema.index({ category: 1 });
PropertySchema.index({ isApproved: 1 });
PropertySchema.index({ createdAt: -1 });

export default mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema);