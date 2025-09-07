import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seedData';

export async function POST() {
  try {
    // Only allow seeding in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Seeding not allowed in production' },
        { status: 403 }
      );
    }

    const result = await seedDatabase();
    
    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      data: result.data,
    });

  } catch (error: any) {
    console.error('Seed API error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST method to seed the database',
    note: 'This endpoint is only available in development mode',
  });
}