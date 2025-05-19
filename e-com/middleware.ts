export { default } from 'next-auth/middleware';

export const config = { matcher: [
    '/properties/add',
    '/properties/:id',
    '/profile',
    '/properties/saved',
    '/messages'
] };