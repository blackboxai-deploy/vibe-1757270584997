import { NextResponse, NextRequest } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Property from '@/models/Property';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    const city = searchParams.get('city');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const bhk = searchParams.get('bhk');
    const propertyType = searchParams.get('propertyType');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build query
    const query: any = { isApproved: true, status: 'active' };

    if (type) query.type = type;
    if (category) query.category = category;
    if (city) query['location.city'] = new RegExp(city, 'i');
    if (bhk) query.bhk = parseInt(bhk);
    if (propertyType) query.propertyType = propertyType;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const properties = await Property.find(query)
      .populate('owner', 'name email contact')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Property.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      properties,
      pagination: {
        current: page,
        pages: totalPages,
        total,
        limit
      }
    });

  } catch (error: any) {
    console.error('Properties fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Create new property
    const property = new Property({
      ...body,
      owner: decoded.userId,
      isApproved: false, // Properties need approval
    });

    await property.save();
    await property.populate('owner', 'name email contact');

    return NextResponse.json({
      success: true,
      property,
      message: 'Property listed successfully. Awaiting approval.',
    });

  } catch (error: any) {
    console.error('Property creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}