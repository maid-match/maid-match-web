// import React from 'react';
// import ProfileDropDown from './profiledropdown';
// import Link from "next/link";


// <style>
//   {`
//     .link:hover, .link.active {
//       border-bottom: 2px solid #8c52ff;
//     }
//   `}
// </style>

// const Navbar: React.FC = () => {
//   const user:string = "";
//   return (
//     <div>
//       <nav className="fixed flex flex-row items-center justify-between px-[2vw] w-full h-[75px] z-[100] bg-gray-100 shadow-md overflow-visible">
//         <div className="max-h-[50px]">
//           <a href="/" >
//             <img src="../maidmatch_logo_upd.jpg" width="150" alt="Logo" />
//           </a>
//         </div>
//         <div className="flex flex-row justify-around items-center gap-[3vw] overflow-visible">
//           <div>
//           <Link href="/search" className="link no-underline font-medium text-lg text-[#8c52ff] pb-[1px]">
//                 Search Maids
//               </Link>
//           </div>
//           <div>
//             <Link href="/becomeamaid" className="link no-underline font-medium text-lg text-[#8c52ff] pb-[1px]">
//               Become a Maid
//             </Link>
//           </div>
//           <div>
//             <Link href="/aboutus" className="link no-underline font-medium text-lg text-[#8c52ff] pb-[1px]">
//                 About Us
//             </Link>
//           </div>
//           {user === "" ? (
//             <>
//               <div>
//                 <Link href="/signin" className="link no-underline font-medium text-lg text-[#8c52ff] pb-[1px]">
//                   Sign In
//                 </Link>
//               </div>
//               <div>
//                 <Link href="/signup" className="link no-underline font-medium text-lg text-[#8c52ff] pb-[1px]">
//                   Sign Up
//                 </Link>
//               </div>
//             </>
//           ) : (
//             <ProfileDropDown name="Abhay" />
//           )}
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default Navbar;

"use client"
import React from 'react';
import ProfileDropDown from './profiledropdown';
import Link from "next/link";
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      <nav className="fixed flex flex-row items-center justify-between px-[2vw] w-full h-[75px] z-[100] bg-gray-100 shadow-md overflow-visible">
      <div className="max-h-[50px]">
           <a href="/" >
             <img src="../maidmatch_logo_upd.jpg" width="150" alt="Logo" />
           </a>
         </div>
        <div className="flex flex-row justify-around items-center gap-[3vw] overflow-visible">
        <div>
           <Link href="/search" className="link no-underline font-medium text-lg text-[#8c52ff] pb-[1px]">
                 Search Maids
               </Link>
           </div>
           <div>
             <Link href="/becomeamaid" className="link no-underline font-medium text-lg text-[#8c52ff] pb-[1px]">
               Become a Maid
             </Link>
           </div>
           <div>
             <Link href="/aboutus" className="link no-underline font-medium text-lg text-[#8c52ff] pb-[1px]">
                 About Us
             </Link>
           </div>
          {!isAuthenticated ? (
            <>
              <div>
                <Link href="/signin" className="link no-underline font-medium text-lg text-[#8c52ff] pb-[1px]">
                  Sign In
                </Link>
              </div>
              <div>
                <Link href="/signup" className="link no-underline font-medium text-lg text-[#8c52ff] pb-[1px]">
                  Sign Up
                </Link>
              </div>
            </>
          ) : (
            <ProfileDropDown name={user?.fname || ''} />
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;