'use server';

import connectDB from '@/config/db';
import Messages from '@/models/Messages';
import { revalidatePath } from 'next/cache';

export async function markMessageAsRead(id: string) {
  await connectDB();
  await Messages.findByIdAndUpdate(id, { is_read: true });
  revalidatePath('/messages', 'page'); // optional: revalidate list
}