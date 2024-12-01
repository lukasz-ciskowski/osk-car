import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { getClassroomsQueryObject } from '@/entities/classroom/api/getClassrooms';
import { getGroupsQueryObject } from '@/entities/group/api/getGroups';
import { trpcClient } from '@/lib/trpcClient';
import { TheoreticalLessonForm as TheoreticalLessonFormState } from '@osk-car/models';
import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

function TheoreticalLessonForm() {
    const { control, watch } = useFormContext<TheoreticalLessonFormState>();
    const [startsAt, endsAt] = watch(['startsAt', 'endsAt']);

    const query = useMemo(() => {
        return {
            startsAt: startsAt?.toISOString() ?? '',
            endsAt: endsAt?.toISOString() ?? '',
        };
    }, [startsAt, endsAt]);

    const results = useQueries({
        queries: [getClassroomsQueryObject(query, trpcClient), getGroupsQueryObject(query, trpcClient)],
    });

    const isLoading = results.some((result) => result.isLoading);

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
                name="classroomId"
                control={control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Sala wykładowa</FormLabel>
                        <Select value={field.value?.toString()} onValueChange={field.onChange}>
                            <SelectTrigger autoFocus>
                                <SelectValue placeholder="Wybierz salę" />
                            </SelectTrigger>
                            <SelectContent>
                                {results[0].data?.map((classroom) => (
                                    <SelectItem key={classroom.id} value={classroom.id.toString()}>
                                        {classroom.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name="groupId"
                control={control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Grupa</FormLabel>
                        <Select value={field.value?.toString()} onValueChange={field.onChange}>
                            <SelectTrigger autoFocus>
                                <SelectValue placeholder="Wybierz grupę" />
                            </SelectTrigger>
                            <SelectContent>
                                {results[1].data?.map((group) => (
                                    <SelectItem key={group.id} value={group.id.toString()}>
                                        {group.name}
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
export default TheoreticalLessonForm;
