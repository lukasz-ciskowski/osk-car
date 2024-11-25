import { LoaderFunctionArgs } from '@remix-run/node';

export function getCurrentUser(c: LoaderFunctionArgs) {
    return c.context.trpcServer.user.getCurrentUser.query();
}
