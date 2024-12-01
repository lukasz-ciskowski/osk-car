import { PropsWithChildren, useMemo } from 'react';
import { setupTrpc, TrpcInstance } from './trpc';
import { useNavigate } from 'react-router';
import { useAuth } from '@clerk/clerk-react';

// @ts-ignore
export let trpcClient: TrpcInstance = null;

function TrpcProvider({ children }: PropsWithChildren) {
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const handleGetToken = async () => {
        const token = await getToken();
        if (!token) {
            navigate('/sign-in');
            return '';
        }
        return token;
    };

    useMemo(() => {
        trpcClient = setupTrpc({ getToken: handleGetToken });
    }, []);

    return <>{children}</>;
}
export default TrpcProvider;
