import { queryClient } from '@/queryClient';
import { Route } from '../students/+types/route';
import { getStudentsQueryObject } from '@/entities/user/api/getStudents';
import { checkRoleQueryObject } from '@/entities/role/api/checkRole';
import { MetaFunction, redirect } from 'react-router';
import StudentsTable from '@/features/students/ui/StudentsTable';

export async function loader({ context }: Route.LoaderArgs) {
    const trpc = context.trpcServer!;
    const access = await queryClient.fetchQuery(
        checkRoleQueryObject({
            trpc,
            query: {
                kind: 'students_list',
                actions: ['read'],
            },
        }),
    );

    if (!access.students_list?.read) {
        return redirect('/');
    }
    await queryClient.prefetchQuery(getStudentsQueryObject(trpc));
}

export const meta: MetaFunction = () => {
    return [{ title: 'Kursanci | OSK-Car' }];
};

function Students() {
    return <StudentsTable />;
}
export default Students;
