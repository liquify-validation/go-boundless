import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
} from "@material-tailwind/react";
// import {
//   UserCircleIcon,
//   Cog6ToothIcon,
//   InboxArrowDownIcon,
//   LifebuoyIcon,
//   PowerIcon,
//   ChevronDownIcon,
// } from "@heroicons/react/24/solid";
import { BasketIcon, GoBoundlessLogoGreen } from "../assets";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import CustomButton from "../ui/CustomButton";
import { useAuth } from "../context/AuthContext";

// const profileMenuItems = [
//   { label: "Account Settings", icon: Cog6ToothIcon, link: "/account-settings" },
//   { label: "Go Points", icon: UserCircleIcon, link: "/go-points" },
//   { label: "Help Center", icon: LifebuoyIcon, link: "/help-center" },
//   { label: "Order History", icon: InboxArrowDownIcon, link: "/order-history" },
//   { label: "Sign Out", icon: PowerIcon, isDanger: true, action: "logout" },
// ];

// function ProfileMenu() {
//   const { logoutUser } = useAuth();
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);

//   const closeMenu = () => setIsMenuOpen(false);

//   const handleMenuItemClick = (item) => {
//     closeMenu();
//     if (item.action === "logout") {
//       logoutUser();
//     } else if (item.link) {
//       window.location.href = item.link;
//     }
//   };

//   return (
//     <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
//       <MenuHandler>
//         <Button
//           variant="text"
//           color="blue-gray"
//           className="flex items-center gap-1 py-0.5 pr-2 pl-0.5 text-white"
//         >
//           <span className="font-normal">Profile</span>
//           <ChevronDownIcon
//             strokeWidth={2.5}
//             className={`h-4 w-4 transition-transform ${
//               isMenuOpen ? "rotate-180" : ""
//             }`}
//           />
//         </Button>
//       </MenuHandler>
//       <MenuList className="p-1 bg-[#02150f] text-white">
//         {profileMenuItems.map(({ label, icon, isDanger, link, action }) => (
//           <MenuItem
//             key={label}
//             onClick={() =>
//               handleMenuItemClick({ label, icon, isDanger, link, action })
//             }
//             className={`flex items-center gap-2 rounded ${
//               isDanger
//                 ? "hover:bg-red-500/10 focus:bg-red-500/10"
//                 : "hover:bg-[#123f28]"
//             }`}
//           >
//             {React.createElement(icon, {
//               className: `h-4 w-4 ${isDanger ? "text-red-500" : "text-white"}`,
//               strokeWidth: 2,
//             })}
//             <Typography
//               as="span"
//               variant="small"
//               className="font-normal text-white"
//             >
//               {label}
//             </Typography>
//           </MenuItem>
//         ))}
//       </MenuList>
//     </Menu>
//   );
// }

const Navbar = () => {
  const { authData, logoutUser } = useAuth();

  const isAuthenticated = !!authData.userAccessToken;
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <header className="w-full bg-bg text-text py-4 px-6 sm:px-12">
      <nav className="w-full flex items-center justify-between">
        {/* Logo */}
        <Link
          className="flex-none text-xl font-semibold focus:outline-none focus:opacity-80"
          to="/"
        >
          <img src={GoBoundlessLogoGreen} alt="Brand Logo" />
        </Link>

        <div className="hidden sm:flex flex-1 justify-center">
          <ul className="flex gap-8 items-center">
            <li>
              <Link
                className="font-medium text-white hover:text-primary focus:outline-none"
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-white hover:text-primary focus:outline-none"
                to="/data-packages"
              >
                Data
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link
                    className="font-medium text-white hover:text-primary focus:outline-none"
                    to="/manage"
                  >
                    Manage
                  </Link>
                </li>
                <li>
                  <Link
                    className="font-medium text-white hover:text-primary focus:outline-none"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                className="font-medium text-white hover:text-primary focus:outline-none"
                to="/contact-us"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Hamburger Menu Icon */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <RxHamburgerMenu className="h-6 w-6" />
          </button>
        </div>

        {/* Right Side: Login/Logout Button (Desktop Only) */}
        <div className="hidden sm:flex items-center gap-x-4">
          {isAuthenticated ? (
            <CustomButton onClick={logoutUser} text="Logout" />
          ) : (
            <CustomButton text="Login" link="/login" />
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="flex flex-col items-center justify-center h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-white focus:outline-none"
              aria-label="Close menu"
            >
              <RxCross2 className="h-6 w-6" />
            </button>
            <ul className="flex flex-col items-center gap-6">
              <li>
                <Link
                  className="font-medium text-white text-xl hover:text-primary focus:outline-none"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium text-white text-xl hover:text-primary focus:outline-none"
                  to="/data-packages"
                >
                  Data
                </Link>
              </li>
              {isAuthenticated && (
                <>
                  <li>
                    <Link
                      className="font-medium text-white text-xl hover:text-primary focus:outline-none"
                      to="/manage"
                    >
                      Manage
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="font-medium text-white text-xl hover:text-primary focus:outline-none"
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  className="font-medium text-white text-xl hover:text-primary focus:outline-none"
                  to="/contact-us"
                >
                  Contact Us
                </Link>
              </li>
              {/* Login/Logout Button in Mobile Menu */}
              <li>
                {isAuthenticated ? (
                  <CustomButton
                    onClick={() => {
                      logoutUser();
                      setMenuOpen(false);
                    }}
                    text="Logout"
                  />
                ) : (
                  <CustomButton text="Login" link="/login" />
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
