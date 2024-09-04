import React, { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { BasketIcon, GoBoundlessLogoGreen } from "../assets";
import USFlag from "../assets/countries/USA.svg";

// Profile menu items
const profileMenuItems = [
  { label: "Account Settings", icon: Cog6ToothIcon },
  { label: "Go Points", icon: UserCircleIcon },
  { label: "Help Center", icon: LifebuoyIcon },
  { label: "Order History", icon: InboxArrowDownIcon },
  { label: "Sign Out", icon: PowerIcon, isDanger: true },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 py-0.5 pr-2 pl-0.5 text-white"
        >
          <span className="font-normal">Profile</span>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-4 w-4 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1 bg-[#02150f] text-white">
        {profileMenuItems.map(({ label, icon, isDanger }, key) => (
          <MenuItem
            key={label}
            onClick={closeMenu}
            className={`flex items-center gap-2 rounded ${
              isDanger
                ? "hover:bg-red-500/10 focus:bg-red-500/10"
                : "hover:bg-[#123f28]"
            }`}
          >
            {React.createElement(icon, {
              className: `h-4 w-4 ${isDanger ? "text-red-500" : "text-white"}`,
              strokeWidth: 2,
            })}
            <Typography
              as="span"
              variant="small"
              className="font-normal text-white"
            >
              {label}
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

const Navbar = () => {
  return (
    <header className="w-full bg-bg text-text py-4 px-12">
      <nav className="w-full flex flex-wrap items-center justify-between">
        {/* Logo */}
        <a
          className="sm:order-1 flex-none text-xl font-semibold focus:outline-none focus:opacity-80"
          href="#"
        >
          <img src={GoBoundlessLogoGreen} alt="Brand Logo" />
        </a>

        {/* Center Menu */}
        <div
          id="navbar-menu"
          className="hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2"
        >
          <ul className="flex flex-col gap-8 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:pl-24">
            <li>
              <a
                className="font-medium text-white hover:text-primary focus:outline-none"
                href="#"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="font-medium text-white hover:text-primary focus:outline-none"
                href="#"
              >
                Data
              </a>
            </li>
            <li>
              <a
                className="font-medium text-white hover:text-primary focus:outline-none"
                href="#"
              >
                Manage
              </a>
            </li>
            <li>
              <a
                className="font-medium text-white hover:text-primary focus:outline-none"
                href="#"
              >
                Contact Us
              </a>
            </li>
            <ProfileMenu />
          </ul>
        </div>

        {/* Right Side: Language/Currency, Basket Icon, and Login Button */}
        <div className="sm:order-3 flex items-center gap-x-8">
          {/* Language/Currency Dropdown */}
          <div className="flex items-center text-white hover:text-primary focus:outline-none">
            <img src={USFlag} alt="US Flag" className="h-5 mr-2" />
            USD
          </div>

          {/* Basket Icon */}
          <button
            type="button"
            className="relative focus:outline-none text-white hover:text-primary"
          >
            <img src={BasketIcon} alt="Basket" />
            <span className="sr-only">Basket</span>
          </button>

          {/* Login Button */}
          <Button text="Login" link="login" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
