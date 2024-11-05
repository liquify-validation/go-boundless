import React from "react";
import { Link } from "react-router-dom";
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
import CustomButton from "../ui/CustomButton";
import { useAuth } from "../context/AuthContext";

// TO DO - Navbar centered on non authenticated users

const profileMenuItems = [
  { label: "Account Settings", icon: Cog6ToothIcon, link: "/account-settings" },
  { label: "Go Points", icon: UserCircleIcon, link: "/go-points" },
  { label: "Help Center", icon: LifebuoyIcon, link: "/help-center" },
  { label: "Order History", icon: InboxArrowDownIcon, link: "/order-history" },
  { label: "Sign Out", icon: PowerIcon, isDanger: true, action: "logout" },
];

function ProfileMenu() {
  const { logoutUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleMenuItemClick = (item) => {
    closeMenu();
    if (item.action === "logout") {
      logoutUser();
    } else if (item.link) {
      window.location.href = item.link;
    }
  };

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
        {profileMenuItems.map(({ label, icon, isDanger, link, action }) => (
          <MenuItem
            key={label}
            onClick={() =>
              handleMenuItemClick({ label, icon, isDanger, link, action })
            }
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
  const { authData, logoutUser } = useAuth();

  const isAuthenticated = !!authData.userAccessToken;

  return (
    <header className="w-full bg-bg text-text py-4 px-12">
      <nav className="w-full flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link
          className="sm:order-1 flex-none text-xl font-semibold focus:outline-none focus:opacity-80"
          to="/"
        >
          <img src={GoBoundlessLogoGreen} alt="Brand Logo" />
        </Link>

        {/* Center Menu */}
        <div
          id="navbar-menu"
          className="hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2"
        >
          <ul className="flex flex-col gap-8 mt-5 sm:flex-row sm:items-center sm:mt-0 ">
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

            {/* Conditionally Render "Manage" and "Profile" Links */}
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
                {/* <li>
                  <ProfileMenu />
                </li> */}
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

        {/* Right Side: Language/Currency, Basket Icon, and Login/Logout Button */}
        <div className="sm:order-3 flex items-center gap-x-8">
          {/* Language/Currency Dropdown (Optional) */}
          {/* <div className="flex items-center text-white hover:text-primary focus:outline-none">
            <img src={USFlag} alt="US Flag" className="h-5 mr-2" />
            USD
          </div> */}

          {/* Basket Icon (Optional) */}
          {/* <button
            type="button"
            className="relative focus:outline-none text-white hover:text-primary"
          >
            <img src={BasketIcon} alt="Basket" />
            <span className="sr-only">Basket</span>
          </button> */}

          {/* Conditionally Render Login or Logout Button */}
          {isAuthenticated ? (
            <CustomButton onClick={logoutUser} text="Logout" />
          ) : (
            <CustomButton text="Login" link="/login" />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
