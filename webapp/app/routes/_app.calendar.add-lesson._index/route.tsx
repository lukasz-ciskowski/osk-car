import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format, setHours } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { getValidatedFormData, RemixFormProvider, useRemixForm } from 'remix-hook-form';
import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Form, useLoaderData, useSearchParams } from '@remix-run/react';
import LessonForm from '@/features/lesson/ui/LessonForm';
import { LessonSchema, LessonForm as LessonFormState, LessonType } from '@osk-car/models';
import { getCurrentUser } from '@/entities/user/api/getCurrentUser';

const resolver = zodResolver(LessonSchema);

export const action = async ({ request, context }: ActionFunctionArgs) => {
    const {
        errors,
        data,
        receivedValues: defaultValues,
    } = await getValidatedFormData<LessonFormState>(request, resolver);
    if (errors) return { errors, defaultValues };

    if (data.type === LessonType.Theoretical) {
        await context.trpcServer.lesson.createTheoreticalLesson.mutate(data);
    }

    return redirect('/calendar');
};

export const loader = async (args: LoaderFunctionArgs) => {
    const trpcServer = args.context.trpcServer;

    const roleResult = await trpcServer.role.checkRole.query({
        kind: 'instructors_list',
        actions: ['read'],
    });

    const currentUser = await getCurrentUser(args);

    return {
        role: roleResult,
        currentUser: currentUser,
    };
};

function AddLessonModal() {
    const [state] = useSearchParams();
    const result = useLoaderData<typeof loader>();

    const date = new Date(state.get('date') ?? new Date());
    const formMethods = useRemixForm<LessonFormState>({
        resolver,
        defaultValues: {
            startsAt: setHours(date, 16),
            endsAt: setHours(date, 17),
            instructorId: result.currentUser?.id ?? 0,
        },
    });

    return (
        <DialogContent>
            <DialogHeader className="mb-4">
                <DialogTitle>Dodaj zajęcia</DialogTitle>
                <DialogDescription>{format(date, "'Nowe zajęcia na dzień ' dd.MM.yyyy")}</DialogDescription>
            </DialogHeader>
            <RemixFormProvider {...formMethods}>
                <Form method="post" action="/api/lesson" onSubmit={formMethods.handleSubmit}>
                    <LessonForm
                        date={date}
                        canSeeInstructorsList={!!result.role.instructors_list?.read}
                        currentUser={result.currentUser}
                    />
                    <DialogFooter className="mt-4">
                        <Button className="btn" type="submit">
                            Dodaj
                        </Button>
                    </DialogFooter>
                </Form>
            </RemixFormProvider>
        </DialogContent>
    );
}
export default AddLessonModal;
