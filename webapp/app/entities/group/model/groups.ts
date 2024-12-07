import { trpcClient } from '@/lib/trpcClient';

export type Group = Awaited<ReturnType<typeof trpcClient.groups.getAllGroups.query>>[number];
