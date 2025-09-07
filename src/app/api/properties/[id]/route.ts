import { NextResponse, NextRequest } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Property from '@/models/Property';
import { verifyToken } from '@/lib/auth';

interface Params {
  id: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await connectToDatabase();

    const property = await Property.findById(params.id)
      .populate('owner', 'name email contact profilePic');

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await Property.findByIdAndUpdate(params.id, { $inc: { views: 1 } });

    return NextResponse.json({
      success: true,
      property,
    });

  } catch (error: any) {
    console.error('Property fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
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

    const property = await Property.findById(params.id);
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Check ownership or admin rights
    if (property.owner.toString() !== decoded.userId && decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized to edit this property' },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Update property
    const updatedProperty = await Property.findByIdAndUpdate(
      params.id,
      { ...body, isApproved: false }, // Re-approval needed after edit
      { new: true }
    ).populate('owner', 'name email contact');

    return NextResponse.json({
      success: true,
      property: updatedProperty,
      message: 'Property updated successfully',
    });

  } catch (error: any) {
    console.error('Property update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
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

    const property = await Property.findById(params.id);
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Check ownership or admin rights
    if (property.owner.toString() !== decoded.userId && decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized to delete this property' },
        { status: 403 }
      );
    }

    await Property.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: 'Property deleted successfully',
    });

  } catch (error: any) {
    console.error('Property delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}