import { redirect } from '@remix-run/react';

export const loader = async () => {
    return redirect('/dashboard');
};

export default function Index() {
    return <></>;
}
