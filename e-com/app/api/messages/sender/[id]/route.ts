// app/api/messages/sender/[id]/route.ts

import connectDB from '@/config/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
  ) {

  const id = (await params).id; 

  try {
    await connectDB();
    const user = await User.findById(id).select('image').lean();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch message sender' }, { status: 500 });
  }
}
