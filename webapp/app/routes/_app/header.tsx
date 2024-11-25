import { UserButton } from '@clerk/remix';
import logo from '/logo.png';
import NavLink from '@/components/ui/navLink';

interface Props {
    canAccessCalendar: boolean;
    canAccessGroups: boolean;
}

function Header({ canAccessCalendar, canAccessGroups }: Props) {
    return (
        <div className="w-full bg-white shadow-sm">
            <div className="max-w-screen-2xl mx-auto p-2 flex justify-between items-center">
                <img src={logo} alt="logo" className="h-10" />
                <div className="flex items-center justify-center gap-4">
                    {canAccessCalendar && <NavLink to="/calendar">Mój kalendarz</NavLink>}
                    {canAccessGroups && <NavLink to="/groups">Grupy</NavLink>}
                    <div className="w-[40px] flex items-center">
                        <UserButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Header;
