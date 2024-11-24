import { UserButton } from '@clerk/remix';
import logo from '/logo.png';
import NavLink from '@/components/ui/navLink';

function Header() {
    return (
        <div className="w-full bg-white shadow-sm">
            <div className="max-w-screen-2xl mx-auto p-2 flex justify-between items-center">
                <img src={logo} alt="logo" className="h-10" />
                <div className="flex items-center justify-center gap-4">
                    <NavLink to="/dashboard">Mój kalendarz</NavLink>
                    <UserButton />
                </div>
            </div>
        </div>
    );
}
export default Header;
