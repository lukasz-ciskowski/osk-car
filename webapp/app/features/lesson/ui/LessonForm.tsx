import { FormField } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { lessonTypesDictionary } from '@/entities/lesson/lib/lessonTypes';
import { LessonForm as LessonFormState } from '@osk-car/models';

function LessonForm() {
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
                            {Object.entries(lessonTypesDictionary).map(([key, translation]) => (
                                <SelectItem key={key} value={key}>
                                    {translation}
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
