import { useEffect, useState } from 'react';
import { SelectContent, SelectItem } from './select';
import { useWaitForClient } from '@/hooks/useWaitForClient';

const TIMES = Array.from({ length: 48 }, (_, i) => {
    const hours = String(Math.floor(i / 2)).padStart(2, '0');
    const minutes = i % 2 === 0 ? '00' : '30';
    return `${hours}:${minutes}`;
});

function TimePicker() {
    const isReady = useWaitForClient();
    // wait for height calculations to finish to prevent flashes in screen
    if (!isReady) {
        return null;
    }

    return (
        <SelectContent position="item-aligned">
            {TIMES.map((singleTime) => (
                <SelectItem key={singleTime} value={singleTime}>
                    {singleTime}
                </SelectItem>
            ))}
        </SelectContent>
    );
}
export default TimePicker;
