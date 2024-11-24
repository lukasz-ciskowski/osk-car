import { Outlet } from '@remix-run/react';
import Header from './header';
import { SignedIn } from '@clerk/remix';

function Layout() {
    return (
        <SignedIn>
            <Header />
            <div className="max-w-screen-2xl mx-auto p-2">
                <Outlet />
            </div>
        </SignedIn>
    );
}
export default Layout;
