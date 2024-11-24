import { SelectContent, SelectItem } from './select';

const LENGHTHS = [
    {
        value: 30,
        label: '30 min',
    },
    {
        value: 60,
        label: '1 godzina',
    },
    {
        value: 90,
        label: '1,5 godziny',
    },
    {
        value: 120,
        label: '2 godziny',
    },
    {
        value: 150,
        label: '2,5 godziny',
    },
    {
        value: 180,
        label: '3 godziny',
    },
];

function LengthPicker() {
    return (
        <SelectContent>
            {LENGHTHS.map((singleLength) => (
                <SelectItem key={singleLength.value} value={singleLength.value.toString()}>
                    {singleLength.label}
                </SelectItem>
            ))}
        </SelectContent>
    );
}
export default LengthPicker;
