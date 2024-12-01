import { type RouteConfig } from '@react-router/dev/routes';
import { remixRoutesOptionAdapter } from '@react-router/remix-routes-option-adapter';

export default remixRoutesOptionAdapter((defineRoutes) => {
    return defineRoutes((route) => {
        // route('/', './routes/(authorized)/route.tsx', { index: true });
        // route('', 'concerts/layout.tsx', () => {
        //     route('trending', 'concerts/trending.tsx');
        //     route(':city', 'concerts/city.tsx');
        // });
        route('', './routes/(authorized)/layout.tsx', () => {
            route('/', './routes/(authorized)/route.tsx', { index: true });
            route('/calendar', './routes/(authorized)/calendar/route.tsx');
        });
        route('sign-in', './routes/(unauthorized)/sign-in/route.tsx');
    });
}) satisfies RouteConfig;
