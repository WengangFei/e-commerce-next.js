import connectDB from '@/config/db';
import User from '@/models/User';
import { getUserSession } from '@/utiles/getUserSession';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';


const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;
  const session = await getUserSession();

  await connectDB();

  const user = await User.findById(session.user.id);

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const objectId = new mongoose.Types.ObjectId(id);

  // Toggle bookmark
  const exists = user.bookmarks?.some(
    (bookmark: mongoose.Types.ObjectId) => bookmark.equals(objectId)
  );

  if (exists) {
    user.bookmarks = user.bookmarks.filter(
      (bookmark: mongoose.Types.ObjectId) => !bookmark.equals(objectId)
    );
  } else {
    user.bookmarks?.push(objectId);
  }

  await user.save();
  
  return NextResponse.json(
    { success: true, message: exists ? 'Bookmark removed' : 'Bookmark added', bookmarked: !exists },
    { status: 200 }
  );
};

const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const { id } = await params;
  const session = await getUserSession();

  await connectDB();

  const user = await User.findById(session.user.id);

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const objectId = new mongoose.Types.ObjectId(id);

  const exists = user.bookmarks?.some(
    (bookmark: mongoose.Types.ObjectId) => bookmark.equals(objectId)
  );    

  return NextResponse.json(
    { success: true, bookmarked: exists },
    { status: 200 }
  );
};

export { POST, GET };