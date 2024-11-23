import { FormField } from '@/components/ui/form';
import { getLessonTypesQuery } from '@/entities/lesson/api/getLessonTypes';
import { trpcClient } from '@/lib/trpcClient';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import { LessonFormState } from '../schemas/lessonSchema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { lessonTypesDictionary } from '@/entities/lesson/lib/lessonTypes';

function LessonForm() {
    const { data } = useQuery(getLessonTypesQuery(trpcClient));
    const { control } = useFormContext<LessonFormState>();

    return (
        <div className="flex flex-col gap-6">
            <FormField
                name="type"
                control={control}
                render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger autoFocus>
                            <SelectValue placeholder="Wybierz typ lekcji" />
                        </SelectTrigger>
                        <SelectContent>
                            {data?.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {lessonTypesDictionary[type]}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
        </div>
    );
}
export default LessonForm;
