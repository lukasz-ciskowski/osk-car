import { PropsWithChildren } from 'react';

export function TextLabelContainer({ children }: PropsWithChildren) {
    return <div className="flex flex-col">{children}</div>;
}

export function TextLabel({ children }: PropsWithChildren) {
    return <span className="text-gray-500 text-sm">{children}</span>;
}

export function TextLabelValue({ children }: PropsWithChildren) {
    return <span>{children}</span>;
}
