import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { FormField, FormItem, FormLabel, FormMessage, FormProvider } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { retrieveGroupWithStudentsQueryObject } from '@/entities/group/api/retrieveGroupWithStudents';
import { User } from '@/entities/user/model/user';
import { trpcClient } from '@/lib/trpcClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddStudentForm as AddStudentFormType, AddStudentSchema } from '@osk-car/models';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

interface Props {
    students: User[];
    groupId: number;
    onClose: () => void;
}

function AddStudentForm({ students, groupId, onClose }: Props) {
    const methods = useForm<AddStudentFormType>({
        resolver: zodResolver(AddStudentSchema),
    });
    const { handleSubmit, control } = methods;

    const { isPending, mutate } = useMutation({
        mutationFn: (form: AddStudentFormType) => {
            return trpcClient.groups.addStudentToGroup.mutate({
                groupId,
                studentId: form.studentId,
            });
        },
    });
    const client = useQueryClient();

    const handleAddStudent = (form: AddStudentFormType) => {
        mutate(form, {
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: retrieveGroupWithStudentsQueryObject(groupId, trpcClient).queryKey,
                });
                onClose();
            },
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleAddStudent)}>
                <FormProvider {...methods}>
                    <FormField
                        name="studentId"
                        control={control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Studenci</FormLabel>
                                <Select value={field.value?.toString()} onValueChange={field.onChange}>
                                    <SelectTrigger autoFocus>
                                        <SelectValue placeholder="Wybierz studenta" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {students?.map((student) => (
                                            <SelectItem key={student.id} value={student.id.toString()}>
                                                {student.firstName} {student.lastName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter className="mt-4">
                        <Button isLoading={isPending}>Dodaj</Button>
                    </DialogFooter>
                </FormProvider>
            </form>
        </>
    );
}
export default AddStudentForm;
