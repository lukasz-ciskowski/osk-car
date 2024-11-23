import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { getAuth } from '@clerk/remix/ssr.server';
import { setupTrpc } from './trpc';

export const trpcServer = async (args: LoaderFunctionArgs | ActionFunctionArgs) => {
    const { getToken } = await getAuth(args);
    const token = await getToken();
    if (!token) {
        return null;
    }

    return setupTrpc({ getToken });
};
