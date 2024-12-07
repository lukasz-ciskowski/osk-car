import { type RouteConfig } from '@react-router/dev/routes';
import { remixRoutesOptionAdapter } from '@react-router/remix-routes-option-adapter';

export default remixRoutesOptionAdapter((defineRoutes) => {
    return defineRoutes((route) => {
        route('', './routes/(authorized)/layout.tsx', () => {
            route('/', './routes/(authorized)/route.tsx', { index: true });
            route('/calendar', './routes/(authorized)/calendar/route.tsx');
            route('/students', './routes/(authorized)/students/route.tsx');
            route('/groups', './routes/(authorized)/groups/route.tsx');
            route('/groups/:id', './routes/(authorized)/groups/[id]/route.tsx');
        });
        route('sign-in', './routes/(unauthorized)/sign-in/route.tsx');
    });
}) satisfies RouteConfig;
