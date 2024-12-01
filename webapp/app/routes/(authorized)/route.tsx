import { redirect } from 'react-router';

export const loader = async () => {
    return redirect('/calendar');
};

export default function Index() {
    return <></>;
}
