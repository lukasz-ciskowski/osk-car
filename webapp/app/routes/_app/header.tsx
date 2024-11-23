import { UserButton } from '@clerk/remix';
import logo from '/logo.png';

function Header() {
    return (
        <div className="w-full bg-white shadow-sm">
            <div className="max-w-screen-2xl mx-auto p-2 flex justify-between items-center">
                <img src={logo} alt="logo" className="h-10" />
                <div>
                    <UserButton />
                </div>
            </div>
        </div>
    );
}
export default Header;
