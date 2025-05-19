import { z } from "zod";


export const addPropertyFormSchema = z.object({
  type: z.string(),
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  description: z.string().optional(),
  location: z.object({
    street: z.string().min(3, { message: 'Street must be at least 3 characters.' }),
    city: z.string().min(3, { message: 'City must be at least 3 characters.' }),
    state: z.string().min(3, { message: 'City must be at least 3 characters.' }),
    zipcode: z.string().min(3, { message: 'City must be at least 3 characters.' }),}),
  beds: z.string().min(1, { message: 'City must be at least 1 characters.' }),
  baths: z.string().min(1, { message: 'City must be at least 1 characters.' }),
  square_feet: z.string().min(1, { message: 'City must be at least 1 characters.' }),
  amenities: z.array(z.string()).optional(),
  rates: z.object({
    weekly: z.string().optional(),
    monthly: z.string().optional(),
    nightly: z.string().optional(),
  }),
  seller_info: z.object({
    name: z.string().optional(),
    email: z.string().email(),
    phone: z.string().optional(),
  }),
  images: z.any(),
});
