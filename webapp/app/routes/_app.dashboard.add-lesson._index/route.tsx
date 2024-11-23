import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { getValidatedFormData, RemixFormProvider, useRemixForm } from 'remix-hook-form';
import { ActionFunctionArgs } from '@remix-run/node';
import { Form, useLocation, useSearchParams } from '@remix-run/react';
import { LessonFormState, lessonSchema } from '@/features/lesson/schemas/lessonSchema';
import LessonForm from '@/features/lesson/ui/LessonForm';

const resolver = zodResolver(lessonSchema);

export const action = async ({ request }: ActionFunctionArgs) => {
    const { errors, data, receivedValues: defaultValues } = await getValidatedFormData<FormData>(request, resolver);
    if (errors) return { errors, defaultValues };

    return data;
};

function AddLessonModal() {
    const [state] = useSearchParams();
    const formMethods = useRemixForm<LessonFormState>({
        resolver,
    });

    const date = new Date(state.get('date') ?? new Date());
    return (
        <DialogContent>
            <DialogHeader className="mb-4">
                <DialogTitle>Dodaj nową lekcję</DialogTitle>
                <DialogDescription>{format(date, "'Nowa lekcja na dzień ' dd.MM.yyyy")}</DialogDescription>
            </DialogHeader>
            <RemixFormProvider {...formMethods}>
                <Form method="post" action="/api/lesson" onSubmit={formMethods.handleSubmit}>
                    <LessonForm />
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
