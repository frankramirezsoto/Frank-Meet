import { SignedIn, UserButton } from '@clerk/nextjs';

import MobileNav from './MobileNav';
import Logo from './Logo';

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Logo size={40} className='text-2xl'/>
      <div className="flex-between gap-5">
        {/* On Sign In it will load the UserButton Component from Clerk  */}
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;