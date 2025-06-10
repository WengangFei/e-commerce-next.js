
import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import Messages from '@/models/Messages';
import { getUserSession } from '@/utiles/getUserSession';
import Property from '@/models/Property';
import mongoose from 'mongoose';

export async function GET() {
  console.log("Registered models:", mongoose.modelNames());

  try {
    await connectDB();

    const session: any = await getUserSession();
    console.log("Session in /api/messages:", session);

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
