import connectToDatabase from './mongodb';
import User from '@/models/User';
import Property from '@/models/Property';

const seedUsers = [
  {
    name: 'Demo User',
    email: 'user@demo.com',
    password: 'password123',
    role: 'user',
  },
  {
    name: 'Admin User',
    email: 'admin@demo.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'John Smith',
    email: 'john.smith@demo.com',
    password: 'password123',
    role: 'user',
    contact: '9876543210',
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@demo.com',
    password: 'password123',
    role: 'user',
    contact: '9876543211',
  }
];

const seedProperties = [
  {
    title: 'Luxury 3BHK Apartment in Bandra West',
    description: 'Stunning sea-facing apartment with modern amenities, spacious rooms, and premium finishing. Located in the heart of Bandra West with easy access to shopping centers, restaurants, and public transport.',
    price: 85000,
    type: 'rent',
    category: 'residential',
    propertyType: 'apartment',
    bhk: 3,
    area: 1200,
    location: {
      address: '15th Floor, Oceanic Tower, Hill Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      coordinates: { latitude: 19.0596, longitude: 72.8295 }
    },
    images: [
      'https://placehold.co/800x600?text=Luxury+3BHK+living+room+with+sea+view',
      'https://placehold.co/800x600?text=Modern+kitchen+with+premium+appliances',
      'https://placehold.co/800x600?text=Master+bedroom+with+city+view'
    ],
    amenities: ['Swimming Pool', 'Gym', '24x7 Security', 'Power Backup', 'Parking'],
    features: ['Sea View', 'Balcony', 'Modular Kitchen', 'Wardrobes'],
    isApproved: true,
    isFeatured: true,
    status: 'active'
  },
  {
    title: 'Modern 4BHK Villa with Garden',
    description: 'Spacious villa with private garden, swimming pool, and contemporary design. Perfect for families looking for luxury living in a peaceful environment.',
    price: 12500000,
    type: 'buy',
    category: 'residential',
    propertyType: 'villa',
    bhk: 4,
    area: 2500,
    location: {
      address: 'Villa No. 45, Prestige Golfshire',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560066',
      coordinates: { latitude: 12.9716, longitude: 77.5946 }
    },
    images: [
      'https://placehold.co/800x600?text=Beautiful+villa+exterior+with+garden',
      'https://placehold.co/800x600?text=Spacious+living+room+with+high+ceiling',
      'https://placehold.co/800x600?text=Private+swimming+pool+and+deck'
    ],
    amenities: ['Private Pool', 'Garden', 'Parking for 3 cars', '24x7 Security', 'Power Backup'],
    features: ['Garden View', 'Private Pool', 'Study Room', 'Servant Quarter'],
    isApproved: true,
    isFeatured: true,
    status: 'active'
  },
  {
    title: 'Premium Commercial Office Space',
    description: 'Grade A commercial office space in prime business district. Fully furnished with modern facilities, perfect for IT companies and corporate offices.',
    price: 125000,
    type: 'rent',
    category: 'commercial',
    propertyType: 'office',
    area: 1800,
    location: {
      address: '12th Floor, DLF Cyber City',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122002',
      coordinates: { latitude: 28.4595, longitude: 77.0266 }
    },
    images: [
      'https://placehold.co/800x600?text=Modern+office+space+with+workstations',
      'https://placehold.co/800x600?text=Conference+room+with+city+view',
      'https://placehold.co/800x600?text=Office+reception+and+waiting+area'
    ],
    amenities: ['Central AC', 'Power Backup', 'Elevator', 'Parking', '24x7 Security'],
    features: ['Furnished', 'IT Ready', 'Conference Room', 'Pantry'],
    isApproved: true,
    isFeatured: true,
    status: 'active'
  },
  {
    title: '2BHK Apartment in IT Hub',
    description: 'Well-designed 2BHK apartment in the heart of IT corridor. Close to tech parks, restaurants, and shopping malls. Perfect for working professionals.',
    price: 35000,
    type: 'rent',
    category: 'residential',
    propertyType: 'apartment',
    bhk: 2,
    area: 900,
    location: {
      address: 'Apartment 8B, Tech Paradise',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500081',
      coordinates: { latitude: 17.3850, longitude: 78.4867 }
    },
    images: [
      'https://placehold.co/800x600?text=Cozy+2BHK+living+space+with+modern+design',
      'https://placehold.co/800x600?text=Compact+kitchen+with+dining+area',
      'https://placehold.co/800x600?text=Bedroom+with+built+in+wardrobes'
    ],
    amenities: ['Gym', 'Swimming Pool', 'Parking', 'Security', 'Power Backup'],
    features: ['Balcony', 'Modular Kitchen', 'Wardrobes', 'Internet Ready'],
    isApproved: true,
    isFeatured: false,
    status: 'active'
  },
  {
    title: 'Spacious 3BHK House for Sale',
    description: 'Independent house with spacious rooms, parking for 2 cars, and small garden. Located in a quiet residential area with good connectivity.',
    price: 8500000,
    type: 'buy',
    category: 'residential',
    propertyType: 'house',
    bhk: 3,
    area: 1800,
    location: {
      address: 'House No. 127, Sector 47',
      city: 'Faridabad',
      state: 'Haryana',
      pincode: '121001',
      coordinates: { latitude: 28.3670, longitude: 77.3155 }
    },
    images: [
      'https://placehold.co/800x600?text=Independent+house+with+front+garden',
      'https://placehold.co/800x600?text=Spacious+living+and+dining+area',
      'https://placehold.co/800x600?text=Master+bedroom+with+attached+bathroom'
    ],
    amenities: ['Parking', 'Garden', 'Security', 'Power Backup'],
    features: ['Independent House', 'Garden', 'Terrace', 'Store Room'],
    isApproved: true,
    isFeatured: false,
    status: 'active'
  },
  {
    title: 'Retail Shop in Prime Location',
    description: 'Ground floor retail space in busy commercial area. High footfall location, perfect for retail business, restaurant, or showroom.',
    price: 95000,
    type: 'rent',
    category: 'commercial',
    propertyType: 'shop',
    area: 600,
    location: {
      address: 'Shop No. 12, Commercial Complex, FC Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411005',
      coordinates: { latitude: 18.5196, longitude: 73.8553 }
    },
    images: [
      'https://placehold.co/800x600?text=Prime+retail+space+with+glass+frontage',
      'https://placehold.co/800x600?text=Spacious+shop+interior+with+natural+light',
      'https://placehold.co/800x600?text=Busy+commercial+street+with+high+footfall'
    ],
    amenities: ['Parking', '24x7 Access', 'Security', 'Power Backup'],
    features: ['Ground Floor', 'Corner Shop', 'High Ceiling', 'Display Windows'],
    isApproved: true,
    isFeatured: false,
    status: 'active'
  }
];

export async function seedDatabase() {
  try {
    await connectToDatabase();
    
    console.log('Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Property.deleteMany({});

    // Create users
    const users = [];
    for (const userData of seedUsers) {
      const user = new User(userData);
      await user.save();
      users.push(user);
    }
    console.log('Users seeded successfully');

    // Create properties (assign to different users)
    for (let i = 0; i < seedProperties.length; i++) {
      const propertyData = seedProperties[i];
      const ownerIndex = i % (users.length - 1); // Exclude admin from being property owner
      
      const property = new Property({
        ...propertyData,
        owner: users[ownerIndex]._id,
      });
      await property.save();
    }
    console.log('Properties seeded successfully');

    console.log('Database seeding completed!');
    
    return {
      success: true,
      message: 'Database seeded successfully',
      data: {
        users: users.length,
        properties: seedProperties.length,
      }
    };

  } catch (error) {
    console.error('Seeding error:', error);
    throw error;
  }
}