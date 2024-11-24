import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { lessonTypesDictionary } from '@/entities/lesson/lib/lessonTypes';
import { LessonForm as LessonFormState, LessonType } from '@osk-car/models';
import { addMinutes, differenceInMinutes, format } from 'date-fns';
import { createDateWithTime } from '../lib/dates';
import TimePicker from '@/components/ui/timePicker';
import LengthPicker from '@/components/ui/lengthPicker';
import TheoreticalLessonForm from './TheoreticalLessonForm';

interface Props {
    date: Date;
}

function LessonForm({ date }: Props) {
    const { control, watch, setValue, getValues } = useFormContext<LessonFormState>();

    const type = watch('type');
    return (
        <>
            <div className="flex flex-col gap-6">
                <FormField
                    name="type"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Zajęcia</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger autoFocus>
                                    <SelectValue placeholder="Wybierz rodzaj zajęć" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(lessonTypesDictionary).map(([key, translation]) => (
                                        <SelectItem key={key} value={key}>
                                            {translation}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <FormField
                            name="startsAt"
                            control={control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Godzina rozpoczęcia</FormLabel>
                                    <Select
                                        value={format(field.value, 'HH:mm')}
                                        onValueChange={(e) => {
                                            const diff = differenceInMinutes(
                                                new Date(getValues('endsAt')),
                                                new Date(getValues('startsAt')),
                                            );
                                            const newDate = createDateWithTime(date, e);
                                            field.onChange(newDate);
                                            setValue('endsAt', addMinutes(newDate, diff));
                                        }}
                                    >
                                        <SelectTrigger autoFocus>
                                            <SelectValue placeholder="Wybierz godzinę rozpoczęcia" />
                                        </SelectTrigger>
                                        <TimePicker />
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2">
                        <FormField
                            name="endsAt"
                            control={control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Długość</FormLabel>
                                    <Select
                                        value={differenceInMinutes(field.value, watch('startsAt')).toString()}
                                        onValueChange={(e) => {
                                            const startAt = getValues('startsAt');
                                            const duration = parseInt(e, 10);
                                            const newDate = addMinutes(new Date(startAt), duration);
                                            field.onChange(newDate);
                                        }}
                                    >
                                        <SelectTrigger autoFocus>
                                            <SelectValue placeholder="Wybierz długość zajęć" />
                                        </SelectTrigger>
                                        <LengthPicker />
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-8">{type === LessonType.Theoretical && <TheoreticalLessonForm />}</div>
        </>
    );
}
export default LessonForm;
