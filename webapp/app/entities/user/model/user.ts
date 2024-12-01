import { getCurrentUser } from '../api/getCurrentUser';

export type User = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>;
