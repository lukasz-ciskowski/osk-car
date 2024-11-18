import { getAuth } from '@clerk/remix/ssr.server';
import { LoaderFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/react';

export async function getAuthToken(args: LoaderFunctionArgs): Promise<string> {
    const { getToken } = await getAuth(args);
    const token = await getToken();
    if (!token) throw redirect('/login');

    return token;
}
