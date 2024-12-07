import { checkRoleQueryObject } from '@/entities/role/api/checkRole';
import { queryClient } from '@/queryClient';
import { Route } from '../groups/+types/route';
import { MetaFunction, redirect } from 'react-router';
import { getAllGroupsQueryObject } from '@/entities/group/api/getAllGroups';
import { dehydrate } from '@tanstack/react-query';
import GroupsTable from '@/features/groups/ui/GroupsTable';

export async function loader({ context }: Route.LoaderArgs) {
    const trpc = context.trpcServer!;
    const access = await queryClient.fetchQuery(
        checkRoleQueryObject({
            trpc,
            query: {
                kind: 'groups',
                actions: ['read'],
            },
        }),
    );

    if (!access.groups?.read) {
        return redirect('/');
    }
    await queryClient.prefetchQuery(getAllGroupsQueryObject(trpc));
    return {
        dehydratedState: dehydrate(queryClient),
    };
}

export const meta: MetaFunction = () => {
    return [{ title: 'Grupy | OSK-Car' }];
};

function Groups() {
    return <GroupsTable />;
}
export default Groups;
