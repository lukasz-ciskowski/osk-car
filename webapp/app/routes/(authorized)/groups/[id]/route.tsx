import { queryClient } from '@/queryClient';
import { Route } from '../../groups/[id]/+types/route';
import { checkRoleQueryObject } from '@/entities/role/api/checkRole';
import { MetaFunction, redirect } from 'react-router';
import { retrieveGroupWithStudentsQueryObject } from '@/entities/group/api/retrieveGroupWithStudents';
import { dehydrate, HydrationBoundary, useSuspenseQuery } from '@tanstack/react-query';
import { trpcClient } from '@/lib/trpcClient';
import SingleGroupTable from '@/features/groups/ui/SingleGroupTable';

export async function loader({ context, params }: Route.LoaderArgs) {
    const id = Number(params.id);

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
    await queryClient.prefetchQuery(retrieveGroupWithStudentsQueryObject(id, trpc));
}

export const meta: MetaFunction = () => {
    return [{ title: 'Grupa | OSK-Car' }];
};

function SingleGroup(props: Route.ComponentProps) {
    const id = Number(props.params.id);
    return <SingleGroupTable id={id} />;
}
export default SingleGroup;
