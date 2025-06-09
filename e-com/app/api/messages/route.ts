
import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import Messages from '@/models/Messages';
import { getUserSession } from '@/utiles/getUserSession';

export async function GET() {
    console.log('fetching messages...');
  try {
    await connectDB();
    const session = await getUserSession();
    const messages = await Messages.find({ receiver: session.user.id }).populate('property','name').sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}