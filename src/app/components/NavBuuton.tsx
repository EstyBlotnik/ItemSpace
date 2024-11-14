import Link from 'next/link';
import React from 'react';

interface NavBarProps {
    plase: string;
    name: string;
}

const NavButton: React.FC<NavBarProps> = ({ plase, name }) => {
    return (
        <Link href={plase}>
            {name}
        </Link>
    );
}

export default NavButton;