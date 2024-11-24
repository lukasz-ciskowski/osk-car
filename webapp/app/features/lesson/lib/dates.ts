import { setHours, setMinutes } from 'date-fns';

export function createDateWithTime(date: Date, time: string): Date {
    console.log('🚀 ~ createDateWithTime ~ date: Date, time: string:', date, time);
    const [hours, minutes] = time.split(':').map(Number);
    let newDate = setHours(date, hours);
    newDate = setMinutes(newDate, minutes);
    return newDate;
}
