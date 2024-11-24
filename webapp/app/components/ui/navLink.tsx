import { cn } from '@/lib/utils';
import { NavLinkProps, NavLink as RouterNavLink } from '@remix-run/react';

function NavLink(props: NavLinkProps) {
    return (
        <RouterNavLink
            {...props}
            className={({ isActive }) => cn(isActive ? `text-primary` : `text-black`, props.className)}
        >
            {props.children}
        </RouterNavLink>
    );
}
export default NavLink;
