import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './Navbar.css';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useNewsContext } from "../Context/Context";

const StickyNavbar = () => {
  const { category, changeCategory } = useNewsContext();
  const [openNav, setOpenNav] = useState(false);
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    });
  }, []);

  // Available news categories
  const categories = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology"
  ];

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {categories.map((cat) => (
        <Typography
          as="li"
          key={cat}
          variant="small"
          color="blue-gray"
          className={`p-1 font-normal cursor-pointer capitalize ${
            category === cat ? "text-blue-700 font-semibold underline" : ""
          }`}
        >
          <span onClick={() => changeCategory(cat)} className="flex items-center">
            {cat}
          </span>
        </Typography>
      ))}
    </ul>
  );

  return (
    <div className="w-full">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 shadow-md">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography as="a" href="#" className="mr-4 cursor-pointer py-1.5 font-medium">
            NewsApp
          </Typography>

          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>

            <div className="flex items-center gap-x-2">
              {!isAuthenticated ? (
                <>
                  <Button variant="text" size="sm" className="hidden lg:inline-block hover:shadow-lg" onClick={loginWithRedirect}>
                    <span>Log In</span>
                  </Button>
                  <Button variant="gradient" size="sm" className="hidden lg:inline-block" onClick={loginWithRedirect}>
                    <span>Sign Up</span>
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="small" className="hidden lg:inline-block">
                    Hello, {user?.name}
                  </Typography>
                  <Button variant="gradient" size="sm" className="hidden lg:inline-block" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                    <span>Logout</span>
                  </Button>
                </>
              )}
            </div>

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </IconButton>
          </div>
        </div>

        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            {!isAuthenticated ? (
              <>
                <Button fullWidth variant="text" size="sm" onClick={loginWithRedirect}>
                  <span>Log In</span>
                </Button>
                <Button fullWidth variant="gradient" size="sm" onClick={loginWithRedirect}>
                  <span>Sign Up</span>
                </Button>
              </>
            ) : (
              <Button fullWidth variant="gradient" size="sm" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                <span>Logout</span>
              </Button>
            )}
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
};

export default StickyNavbar;
