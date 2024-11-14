import React from 'react';
import NavButton from './NavBuuton';

// הגדרת הממשק NavBarProps
interface NavBarProps {
  plase: string;
  name: string;
}

// יצירת מערך של NavBarProps
const navItems: NavBarProps[] = [
  { plase: "/pages/login", name: "Log in" },
  { plase: "/pages/sighnup", name: "Sighn up" }
];

const NavBar: React.FC = () => {
  return (
    <div className="bg-blue-500 flex justify-between text-white py-2 px-5" >
      <div className='font-bold font-serif'><NavButton plase="/" name="My Website" /></div>
      <div className='flex gap-[9px] text-[13px] items-center justify-center'>
        {navItems.map((item, index) => (
          <NavButton key={index} plase={item.plase} name={item.name} />
        ))}
      </div>
    </div>
  );
}

export default NavBar;
