
import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import Messages from '@/models/Messages';
import { getUserSession } from '@/utiles/getUserSession';
import Property from '@/models/Property';
import mongoose from 'mongoose';

export async function GET() {

  try {
    await connectDB();
    //Explicitly check/register models (optional safeguard)
    const Property = (await import('@/models/Property')).default; // Dynamic import
    const session: any = await getUserSession();
    if (!session || !session.user || !session.user.id) {
      console.error("No valid user session.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const messages = await Messages.find({ receiver: session.user.id })
      .populate('property', 'name')
      .sort({ createdAt: -1 });

    return NextResponse.json(messages);
  } catch (err) {
    console.error("ERROR in /api/messages:", err);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
