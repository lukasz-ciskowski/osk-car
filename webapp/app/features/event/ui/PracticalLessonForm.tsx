import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { getStudentsQueryObject } from '@/entities/user/api/getStudents';
import { trpcClient } from '@/lib/trpcClient';
import { PracticalEventForm } from '@osk-car/models';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

function PracticalLessonForm() {
    const { control } = useFormContext<PracticalEventForm>();

    const { isLoading, data } = useQuery(getStudentsQueryObject(trpcClient));

    if (isLoading) {
        return (
            <div className="mx-auto">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <FormField
                name="studentId"
                control={control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Kursant</FormLabel>
                        <Select value={field.value?.toString()} onValueChange={field.onChange}>
                            <SelectTrigger autoFocus>
                                <SelectValue placeholder="Wybierz kursanta" />
                            </SelectTrigger>
                            <SelectContent>
                                {data?.map((student) => (
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
        </div>
    );
}
export default PracticalLessonForm;
